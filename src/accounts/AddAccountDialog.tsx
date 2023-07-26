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
  const nameInput = useInput((value) => value.trim().length > 0, "");

  const cancelHandler = () => {
    onClose();
    nameInput.reset();
  };

  const addHandler = () => {
    if (!nameInput.isValid) return;
    onAdd({ name: nameInput.value });
    onClose();
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
        <Button onClick={addHandler}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
