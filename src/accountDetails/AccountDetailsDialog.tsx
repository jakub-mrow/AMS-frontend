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
import { AccountTransactionType } from "../accounts/types.ts";
import { DialogType } from "./use-account-details.ts";
import { Controller, useForm } from "react-hook-form";
import { isValidAmount, isValidCurrency } from "../util/validations.ts";

interface TransactionFormData {
  amount: string;
  currency: string;
  type: string;
}

export const AccountDetailsDialog = ({
  isOpen,
  onClose,
  onConfirm,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    amount: number,
    currency: string,
    type: AccountTransactionType,
  ) => void;
  type: DialogType;
}) => {
  const { control, handleSubmit, reset } = useForm<TransactionFormData>();

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
    onConfirm(
      Number(transactionFormData.amount),
      transactionFormData.currency.trim(),
      transactionType,
    );
    onClose();
    reset();
  });

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>{DialogType[type]}</DialogTitle>
      <DialogContent>
        <form>
          <FormControl>
            <FormLabel id="type">Type</FormLabel>
            <Controller
              name="type"
              control={control}
              defaultValue={"deposit"}
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
          <Controller
            name="amount"
            control={control}
            defaultValue={""}
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
            defaultValue={""}
            rules={{ required: true, validate: isValidCurrency }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="normal"
                label="Currency"
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
