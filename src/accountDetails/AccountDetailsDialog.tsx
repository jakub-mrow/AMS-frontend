import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import useInput from "../util/use-input.ts";
import { isValidAmount, isValidCurrency } from "../util/validations.ts";
import { AccountTransactionType } from "../accounts/types.ts";
import { DialogType } from "./use-account-details.ts";

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
  const amountInput = useInput(isValidAmount, "");
  const currencyInput = useInput(isValidCurrency, "");

  const cancelHandler = () => {
    onClose();
    amountInput.reset();
    currencyInput.reset();
  };

  const confirmHandler = () => {
    if (!amountInput.isValid || !currencyInput.isValid) return;
    const transactionType =
      type === DialogType.DEPOSIT
        ? AccountTransactionType.DEPOSIT
        : AccountTransactionType.WITHDRAWAL;
    onConfirm(
      Number(amountInput.value),
      currencyInput.value.trim(),
      transactionType,
    );
    onClose();
    amountInput.reset();
    currencyInput.reset();
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>
        {type === DialogType.DEPOSIT
          ? "Deposit to account"
          : "Withdraw from account"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          id="amount"
          label="Amount"
          fullWidth
          variant="standard"
          value={amountInput.value}
          onChange={amountInput.valueChangeHandler}
          onBlur={amountInput.inputBlurHandler}
          error={amountInput.hasError}
        />
        <TextField
          margin="normal"
          id="currency"
          label="Currency"
          fullWidth
          variant="standard"
          value={currencyInput.value}
          onChange={currencyInput.valueChangeHandler}
          onBlur={currencyInput.inputBlurHandler}
          error={currencyInput.hasError}
        />
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
