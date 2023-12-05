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
import { Asset, AssetType, Exchange } from "../types.ts";
import { LoadingButton } from "@mui/lab";
import {
  isValidCurrency,
  isValidNumber,
  moneyPattern,
  quantityPattern,
} from "../util/validations.ts";
import { CURRENCIES } from "../util/currencies.ts";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";

interface StockTransactionFormData {
  ticker: string | null;
  exchange: Exchange | null;
  quantity: number | null;
  price: number | null;
  date: Dayjs | null;
  payCurrency: string | null;
  exchangeRate: number | null;
  commission: number | null;
}

const getDialogTitle = (type: AssetType) => {
  switch (type) {
    case AssetType.STOCK:
      return "Buy stocks";
    case AssetType.CRYPTO:
      return "Buy cryptocurrencies";
    case AssetType.BOND:
      return "Buy bonds";
    case AssetType.DEPOSIT:
      return "Buy deposits";
    default:
      exhaustiveGuard(type);
  }
};

export const StocksDialog = ({
  assets,
  type,
  exchanges,
  isOpen,
  onClose,
  onConfirm,
}: {
  assets: Asset[];
  type: AssetType;
  exchanges: Exchange[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    type: AssetType,
    ticker: string,
    exchange: string | null,
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
    const allTickers = assets.map((asset) => asset.ticker);
    return [...new Set(allTickers)];
  }, [assets]);

  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const confirmHandler = handleSubmit((data) => {
    if (
      data.ticker === null ||
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
    if (type === AssetType.STOCK && data.exchange === null) {
      return;
    }
    setIsLoading(true);
    if (type === AssetType.STOCK && data.exchange !== null) {
      onConfirm(
        type,
        data.ticker.trim(),
        data.exchange.code.trim(),
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
    } else if (type === AssetType.CRYPTO) {
      onConfirm(
        type,
        data.ticker.trim(),
        null,
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
    }
  });

  return (
    <Dialog
      open={isOpen}
      onClose={cancelHandler}
      disableRestoreFocus
      onKeyDown={(event) => {
        if (event.key === "Enter") confirmHandler().then();
      }}
    >
      <DialogTitle>{getDialogTitle(type)}</DialogTitle>
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
                onKeyDown={(event) => {
                  if (event.key === "Enter") event.stopPropagation();
                }}
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
          {type === AssetType.STOCK && (
            <Controller
              name="exchange"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  onChange={(_event, newValue) => {
                    field.onChange(newValue);
                  }}
                  options={exchanges}
                  fullWidth
                  autoHighlight
                  autoSelect
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.stopPropagation();
                  }}
                  getOptionLabel={(option) => `${option.name} (${option.code})`}
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
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
          )}
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
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.stopPropagation();
                  }}
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
