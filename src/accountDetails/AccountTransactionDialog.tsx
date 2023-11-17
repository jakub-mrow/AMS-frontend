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
import { AccountTransactionType } from "../types.ts";
import { Controller, useForm } from "react-hook-form";
import { isValidAmount, isValidCurrency } from "../util/validations.ts";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CURRENCIES } from "../util/currencies.ts";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface TransactionFormData {
  date: Dayjs | null;
  amount: string;
  currency: string;
  type: string;
}

export const AccountTransactionDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    amount: number,
    currency: string,
    type: AccountTransactionType,
    date: Dayjs,
  ) => void;
}) => {
  const { control, handleSubmit, reset } = useForm<TransactionFormData>({
    defaultValues: {
      date: dayjs() as Dayjs | null,
      amount: "",
      currency: "",
      type: AccountTransactionType.DEPOSIT,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
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
    if (transactionFormData.date === null) {
      return;
    }
    setIsLoading(true);
    onConfirm(
      Number(transactionFormData.amount),
      transactionFormData.currency.trim(),
      transactionType,
      transactionFormData.date,
    );
    onClose();
    setIsLoading(false);
    reset();
  });

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
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
            rules={{ required: true, validate: isValidAmount }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
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
