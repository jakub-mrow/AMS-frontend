import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AccountInput } from "./use-accounts.ts";
import useInput from "../util/use-input.ts";

export const AddAccountDialog = ({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: AccountInput) => void;
}) => {
  const currencyInput = useInput((value) => value.trim().length > 0, "");

  const cancelHandler = () => {
    onClose();
    currencyInput.reset();
  };

  const addHandler = () => {
    if (!currencyInput.isValid) return;
    onAdd({ currency: currencyInput.value });
    onClose();
    currencyInput.reset();
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Create account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new account, please enter a currency.
        </DialogContentText>
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
        <Button onClick={addHandler}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
