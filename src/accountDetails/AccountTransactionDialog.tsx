import {
  Autocomplete,
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
import { AccountTransaction, AccountTransactionType } from "../types.ts";
import { Controller, useForm } from "react-hook-form";
import {
  isValidCurrency,
  isValidNumber,
  moneyPattern,
} from "../util/validations.ts";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CURRENCIES } from "../util/currencies.ts";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";

interface TransactionFormData {
  date: Dayjs | null;
  amount: number | null;
  currency: string;
  type: string;
}

export const AccountTransactionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  onDelete,
  baseCurrency,
  transactionToEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    amount: number,
    currency: string,
    type: AccountTransactionType,
    date: Dayjs,
  ) => void;
  onDelete: () => void;
  baseCurrency: string;
  transactionToEdit: AccountTransaction | null;
}) => {
  const { control, handleSubmit, reset } = useForm<TransactionFormData>({
    defaultValues: {
      date: transactionToEdit ? dayjs(transactionToEdit.date) : dayjs(),
      amount: transactionToEdit ? transactionToEdit.amount : null,
      currency: transactionToEdit ? transactionToEdit.currency : baseCurrency,
      type: transactionToEdit
        ? transactionToEdit.type
        : AccountTransactionType.DEPOSIT,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    reset({
      date: transactionToEdit ? dayjs(transactionToEdit.date) : dayjs(),
      amount: transactionToEdit ? transactionToEdit.amount : null,
      currency: transactionToEdit ? transactionToEdit.currency : baseCurrency,
      type: transactionToEdit
        ? transactionToEdit.type
        : AccountTransactionType.DEPOSIT,
    });
  }, [reset, transactionToEdit, baseCurrency]);

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

  const confirmHandler = handleSubmit((transactionFormData) => {
    let transactionType;
    if (transactionFormData.type === AccountTransactionType.DEPOSIT) {
      transactionType = AccountTransactionType.DEPOSIT;
    } else {
      transactionType = AccountTransactionType.WITHDRAWAL;
    }
    if (
      transactionFormData.amount === null ||
      transactionFormData.date === null
    ) {
      return;
    }
    setIsLoading(true);
    onConfirm(
      transactionFormData.amount,
      transactionFormData.currency.trim(),
      transactionType,
      transactionFormData.date,
    );
    onClose();
    setIsLoading(false);
    reset();
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
        <DialogTitle>Add transaction</DialogTitle>
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
                      value={"deposit"}
                      control={<Radio />}
                      label="Deposit"
                    />
                    <FormControlLabel
                      value={"withdrawal"}
                      control={<Radio />}
                      label="Withdrawal"
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
              name="amount"
              control={control}
              rules={{
                required: true,
                validate: isValidNumber,
                pattern: moneyPattern,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="normal"
                  label="Amount"
                  fullWidth
                  variant="standard"
                  error={!!error}
                />
              )}
            />
            <Controller
              name="currency"
              control={control}
              rules={{
                required: true,
                validate: isValidCurrency,
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      label="Currency"
                      variant="standard"
                      error={!!error}
                    />
                  )}
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
