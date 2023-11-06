import {
  Autocomplete,
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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { Asset } from "../types.ts";

interface StockTransactionFormData {
  ticker: string | null;
  exchange: string | null;
  quantity: number;
  price: number;
  date: Dayjs | null;
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
  ) => Promise<boolean>;
}) => {
  const { control, handleSubmit, reset } = useForm<StockTransactionFormData>({
    defaultValues: {
      ticker: null,
      exchange: null,
      quantity: 0,
      price: 0,
      date: dayjs() as Dayjs | null,
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

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const confirmHandler = handleSubmit((data) => {
    if (data.ticker === null || data.exchange === null || data.date === null) {
      return;
    }
    onConfirm(
      data.ticker.trim(),
      data.exchange.trim(),
      data.quantity,
      data.price,
      data.date,
    ).then((success) => {
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
                <DatePicker
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelHandler} color="secondary">
          Cancel
        </Button>
        <Button onClick={confirmHandler}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
