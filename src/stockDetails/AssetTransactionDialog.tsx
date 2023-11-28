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
import { AssetTransaction, AssetTransactionType } from "../types.ts";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  isValidNumber,
  moneyPattern,
  quantityPattern,
} from "../util/validations.ts";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";

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
  onDelete,
  transactionToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    quantity: number,
    price: number,
    type: AssetTransactionType,
    date: Dayjs,
  ) => Promise<boolean>;
  onDelete: () => void;
  transactionToEdit: AssetTransaction | null;
}) => {
  const { control, handleSubmit, reset, watch } =
    useForm<StockTransactionFormData>({
      defaultValues: {
        quantity: transactionToEdit ? transactionToEdit.quantity : null,
        price: transactionToEdit ? transactionToEdit.price : null,
        type: transactionToEdit
          ? transactionToEdit.type
          : AssetTransactionType.BUY,
        date: transactionToEdit ? dayjs(transactionToEdit.date) : dayjs(),
      },
    });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    reset({
      quantity: transactionToEdit ? transactionToEdit.quantity : null,
      price: transactionToEdit ? transactionToEdit.price : null,
      type: transactionToEdit
        ? transactionToEdit.type
        : AssetTransactionType.BUY,
      date: transactionToEdit ? dayjs(transactionToEdit.date) : dayjs(),
    });
  }, [reset, transactionToEdit]);

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const deleteHandler = () => {
    setIsConfirmationOpen(true);
  };

  const onDeleteConfirm = () => {
    onDelete();
    setIsConfirmationOpen(false);
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
    <>
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
                    <FormControlLabel
                      value={"dividend"}
                      control={<Radio />}
                      label="Dividend"
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
                  label={
                    watch("type") === "dividend"
                      ? "Dividend per stock"
                      : "Price"
                  }
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
          {transactionToEdit && (
            <Button onClick={deleteHandler} color="error">
              Delete
            </Button>
          )}
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
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={onDeleteConfirm}
        content={`Are you sure you want to delete this transaction?`}
      />
    </>
  );
};
