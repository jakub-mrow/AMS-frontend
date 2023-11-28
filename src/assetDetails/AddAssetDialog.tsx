import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Account } from "../types";
import {
  isValidCurrency,
  isValidNumber,
  moneyPattern,
} from "../util/validations.ts";
import { CURRENCIES } from "../util/currencies.ts";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

interface StockTransactionFormData {
  accountId: number | null;
  ticker: string | null;
  exchange: string | null;
  quantity: number;
  price: number;
  date: Dayjs | null;
  payCurrency: string | null;
  exchangeRate: number | null;
  commission: number | null;
}

export const AddAssetDialog = ({
  accounts,
  assetTicker,
  exchange,
  isOpen,
  onClose,
  onConfirm,
}: {
  accounts: Account[];
  assetTicker: string;
  exchange: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    accountId: number,
    ticker: string,
    exchange: string,
    quantity: number,
    price: number,
    date: Dayjs,
    payCurrency: string | null,
    exchangeRate: number | null,
    commission: number | null,
  ) => Promise<boolean>;
}) => {
  const { control, handleSubmit, reset, watch } =
    useForm<StockTransactionFormData>({
      defaultValues: {
        accountId: null,
        ticker: assetTicker,
        exchange: exchange,
        quantity: 0,
        price: 0,
        date: dayjs() as Dayjs | null,
        payCurrency: null,
        exchangeRate: null,
        commission: null,
      },
    });
  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const confirmHandler = handleSubmit((data) => {
    if (
      data.ticker === null ||
      data.exchange === null ||
      data.date === null ||
      data.accountId === null
    ) {
      return;
    }
    let payCurrency = null;
    let exchangeRate = null;
    if (data.payCurrency !== null && data.exchangeRate !== null) {
      payCurrency = data.payCurrency;
      exchangeRate = data.exchangeRate;
    }
    setIsLoading(true);
    onConfirm(
      data.accountId,
      data.ticker.trim(),
      data.exchange.trim(),
      data.quantity,
      data.price,
      data.date,
      payCurrency,
      exchangeRate,
      data.commission,
    ).then((success) => {
      setIsLoading(false);
      if (success) {
        onClose();
        reset();
      }
    });
  });

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Buy stocks</DialogTitle>
      <DialogContent>
        <form>
          <FormControl margin="normal" fullWidth variant="standard">
            <FormLabel id="account">Account</FormLabel>
            <Controller
              name="accountId"
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              render={({ field }) => (
                <Select {...field} label="Accounts">
                  {accounts.map((account) => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth variant="standard">
            <FormLabel id="date">Date</FormLabel>
            <Controller
              name="date"
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  slotProps={{
                    textField: {
                      variant: "standard",
                    },
                  }}
                />
              )}
            />
          </FormControl>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: true,
              validate: (quantity) => quantity > 0,
              pattern: /^[0-9]*$/,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                label="Quantity"
                type="number"
                fullWidth
                variant="standard"
                error={!!error}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            rules={{
              required: true,
              validate: (price) => price > 0,
              pattern: /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,2}$/,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                label="Price"
                type="number"
                inputProps={{
                  step: 0.01,
                }}
                fullWidth
                variant="standard"
                error={!!error}
              />
            )}
          />
          <Box sx={{ display: "flex" }}>
            <Controller
              name="payCurrency"
              control={control}
              rules={{
                required: false,
                validate: (currency) =>
                  currency === null || isValidCurrency(currency),
              }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  onChange={(_event, newValue) => {
                    field.onChange(newValue);
                  }}
                  options={CURRENCIES}
                  fullWidth
                  autoHighlight
                  autoSelect
                  sx={{ mr: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      label="Pay currency"
                      variant="standard"
                      error={!!error}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="exchangeRate"
              disabled={watch("payCurrency") === null}
              control={control}
              rules={{
                required: watch("payCurrency") !== null,
                validate: (exchangeRate) =>
                  watch("payCurrency") === null || isValidNumber(exchangeRate),
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Exchange rate"
                  type="number"
                  inputProps={{
                    step: 0.001,
                  }}
                  fullWidth
                  variant="standard"
                  error={!!error}
                />
              )}
            />
          </Box>
          <Controller
            name="commission"
            control={control}
            rules={{
              required: false,
              validate: (commission) =>
                commission === null || isValidNumber(commission),
              pattern: moneyPattern,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                label="Commission"
                type="number"
                inputProps={{
                  step: 0.01,
                }}
                fullWidth
                variant="standard"
                error={!!error}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler} color="secondary">
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={confirmHandler}
          variant="outlined"
        >
          <span>Confirm</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
