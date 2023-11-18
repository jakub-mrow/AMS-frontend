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
import {
  isValidNumber,
  moneyPattern,
  quantityPattern,
} from "../util/validations.ts";

interface StockTransactionFormData {
  quantity: number | null;
  price: number | null;
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
      quantity: null,
      price: null,
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
    if (data.price === null || data.quantity === null || data.date === null) {
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
              validate: isValidNumber,
              pattern: quantityPattern,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                autoFocus
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
