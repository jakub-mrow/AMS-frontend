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
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { Asset } from "../types.ts";
import { LoadingButton } from "@mui/lab";
import {
  isValidCurrency,
  isValidNumber,
  moneyPattern,
  quantityPattern,
} from "../util/validations.ts";
import { CURRENCIES } from "../util/currencies.ts";

interface StockTransactionFormData {
  ticker: string | null;
  exchange: string | null;
  quantity: number | null;
  price: number | null;
  date: Dayjs | null;
  payCurrency: string | null;
  exchangeRate: number | null;
  commission: number | null;
}

export const StocksDialog = ({
  stocks,
  isOpen,
  onClose,
  onConfirm,
}: {
  stocks: Asset[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
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
        ticker: null,
        exchange: null,
        quantity: null,
        price: null,
        date: dayjs() as Dayjs | null,
        payCurrency: null,
        exchangeRate: null,
        commission: null,
      },
    });
  const tickers: string[] = useMemo(() => {
    const allTickers = stocks.map((stock) => stock.ticker);
    return [...new Set(allTickers)];
  }, [stocks]);

  const exchanges: string[] = useMemo(() => {
    const allExchanges = stocks.map((stock) => stock.exchange);
    return [...new Set(allExchanges)];
  }, [stocks]);

  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const confirmHandler = handleSubmit((data) => {
    if (
      data.ticker === null ||
      data.exchange === null ||
      data.quantity === null ||
      data.price === null ||
      data.date === null
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
    <Dialog
      open={isOpen}
      onClose={cancelHandler}
      disableRestoreFocus
      onKeyUp={(event) => {
        if (event.key === "Enter") confirmHandler().then();
      }}
    >
      <DialogTitle>Buy stocks</DialogTitle>
      <DialogContent>
        <form>
          <Controller
            name="ticker"
            control={control}
            rules={{
              required: true,
              validate: (ticker) => ticker !== null && ticker.trim() !== "",
            }}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                onChange={(_event, newValue) => {
                  field.onChange(newValue);
                }}
                freeSolo
                options={tickers}
                fullWidth
                autoHighlight
                autoSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    margin="normal"
                    label="Ticker"
                    variant="standard"
                    error={!!error}
                  />
                )}
              />
            )}
          />
          <Controller
            name="exchange"
            control={control}
            rules={{
              required: true,
              validate: (exchange) =>
                exchange !== null && exchange.trim() !== "",
            }}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                onChange={(_event, newValue) => {
                  field.onChange(newValue);
                }}
                freeSolo
                options={exchanges}
                fullWidth
                autoHighlight
                autoSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Exchange"
                    variant="standard"
                    error={!!error}
                  />
                )}
              />
            )}
          />
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
              validate: isValidNumber,
              pattern: quantityPattern,
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
              validate: isValidNumber,
              pattern: moneyPattern,
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
