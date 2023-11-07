import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import useInput from "../util/use-input.ts";
import { useEffect } from "react";

import { Account } from "./types.ts";

export const UpdateAccountDialog = ({
  isOpen,
  onClose,
  onUpdate,
  accountToUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (account: Account, newName: string) => void;
  accountToUpdate: Account;
}) => {
  const nameInput = useInput(
    (value) => value.trim().length > 0,
    accountToUpdate.name,
  );

  useEffect(() => {
    nameInput.reset();
  }, [accountToUpdate.name]);

  const cancelHandler = () => {
    onClose();
    nameInput.reset();
  };

  const updateHandler = () => {
    if (!nameInput.isValid) return;
    onUpdate(accountToUpdate, nameInput.value);
    onClose();
    nameInput.reset();
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Update account</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter new name for account.</DialogContentText>
        <TextField
          margin="normal"
          id="name"
          label="Name"
          fullWidth
          variant="standard"
          value={nameInput.value}
          onChange={nameInput.valueChangeHandler}
          onBlur={nameInput.inputBlurHandler}
          error={nameInput.hasError}
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
