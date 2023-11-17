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
import { useEffect, useState } from "react";

import { Account } from "../types.ts";
import { LoadingButton } from "@mui/lab";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    nameInput.reset();
  }, [accountToUpdate.name]);

  const cancelHandler = () => {
    onClose();
    nameInput.reset();
  };

  const updateHandler = () => {
    if (!nameInput.isValid) return;
    setIsLoading(true);
    onUpdate(accountToUpdate, nameInput.value);
    onClose();
    setIsLoading(false);
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
        <LoadingButton
          loading={isLoading}
          onClick={updateHandler}
          variant="outlined"
        >
          <span>Update</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
