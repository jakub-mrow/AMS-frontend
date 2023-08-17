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

export const DepositDialog = ({
  isOpen,
  onClose,
  onDeposit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, currency: string) => void;
}) => {
  const amountInput = useInput(isValidAmount, "");
  const currencyInput = useInput(isValidCurrency, "");

  const cancelHandler = () => {
    onClose();
    amountInput.reset();
    currencyInput.reset();
  };

  const addHandler = () => {
    if (!amountInput.isValid || !currencyInput.isValid) return;
    onDeposit(Number(amountInput.value), currencyInput.value.trim());
    onClose();
    amountInput.reset();
    currencyInput.reset();
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Deposit to account</DialogTitle>
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
        <Button onClick={addHandler}>Deposit</Button>
      </DialogActions>
    </Dialog>
  );
};
