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
import { AccountInput } from "./accounts-service.ts";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

export const AddAccountDialog = ({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (account: AccountInput) => void;
}) => {
  const nameInput = useInput((value) => value.trim().length > 0, "");
  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
    onClose();
    nameInput.reset();
  };

  const addHandler = () => {
    if (!nameInput.isValid) return;
    setIsLoading(true);
    onAdd({ name: nameInput.value });
    onClose();
    setIsLoading(false);
    nameInput.reset();
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Create account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new account, please enter a name.
        </DialogContentText>
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
          onClick={addHandler}
          variant="outlined"
        >
          <span>Create</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
