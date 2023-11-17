import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AssetTransactionType } from "../types.ts";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface StockTransactionFormData {
  quantity: number;
  price: number;
  type: AssetTransactionType;
  date: Dayjs | null;
}

export const AssetTransactionDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    quantity: number,
    price: number,
    type: AssetTransactionType,
    date: Dayjs,
  ) => Promise<boolean>;
}) => {
  const { control, handleSubmit, reset } = useForm<StockTransactionFormData>({
    defaultValues: {
      quantity: 0,
      price: 0,
      type: AssetTransactionType.BUY,
      date: dayjs() as Dayjs | null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const confirmHandler = handleSubmit((data) => {
    if (data.date === null) {
      return;
    }
    setIsLoading(true);
    onConfirm(data.quantity, data.price, data.type, data.date).then(
      (success) => {
        if (success) {
          onClose();
          setIsLoading(false);
          reset();
        }
      },
    );
  });

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Buy stocks</DialogTitle>
      <DialogContent>
        <form>
          <FormControl>
            <FormLabel id="type">Type</FormLabel>
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value={"buy"}
                    control={<Radio />}
                    label="Buy"
                  />
                  <FormControlLabel
                    value={"sell"}
                    control={<Radio />}
                    label="Sell"
                  />
                </RadioGroup>
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
