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
  const typeInput = useInput(
    (input) => !!input,
    AccountTransactionType.DEPOSIT,
  );

  const cancelHandler = () => {
    onClose();
    amountInput.reset();
    currencyInput.reset();
  };

  const confirmHandler = () => {
    let transactionType;
    if (typeInput.value === AccountTransactionType.DEPOSIT) {
      transactionType = AccountTransactionType.DEPOSIT;
    } else {
      transactionType = AccountTransactionType.WITHDRAWAL;
    }
    if (!amountInput.isValid || !currencyInput.isValid) return;
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
      <DialogTitle>{DialogType[type]}</DialogTitle>
      <DialogContent>
        <FormControl>
          <FormLabel id="type">Type</FormLabel>
          <RadioGroup
            defaultValue={AccountTransactionType.DEPOSIT}
            value={typeInput.value}
            onChange={typeInput.valueChangeHandler}
            onBlur={amountInput.inputBlurHandler}
          >
            <FormControlLabel
              value={AccountTransactionType.DEPOSIT}
              control={<Radio />}
              label="Deposit"
            />
            <FormControlLabel
              value={AccountTransactionType.WITHDRAWAL}
              control={<Radio />}
              label="Withdrawal"
            />
          </RadioGroup>
        </FormControl>
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
