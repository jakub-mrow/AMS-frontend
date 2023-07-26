import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Account } from "./use-accounts.ts";
import useInput from "../util/use-input.ts";
import { useEffect } from "react";

export const UpdateAccountDialog = ({
  isOpen,
  onClose,
  onUpdate,
  accountToUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (account: Account) => void;
  accountToUpdate: Account;
}) => {
  const currencyInput = useInput(
    (value) => value.trim().length > 0,
    accountToUpdate.currency,
  );

  useEffect(() => {
    currencyInput.reset();
  }, [accountToUpdate.currency]);

  const cancelHandler = () => {
    onClose();
    currencyInput.reset();
  };

  const updateHandler = () => {
    if (!currencyInput.isValid) return;
    onUpdate({ id: accountToUpdate.id, currency: currencyInput.value });
    onClose();
    currencyInput.reset();
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Update account</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter new currency for account.</DialogContentText>
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
        <Button onClick={updateHandler}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};
