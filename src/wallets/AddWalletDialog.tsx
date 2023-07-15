import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { WalletInput } from "./use-wallets";
import useInput from "../util/use-input";

export const AddWalletDialog = ({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (wallet: WalletInput) => void;
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
      <DialogTitle>Create wallet</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new wallet, please enter a currency.
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
        <Button onClick={cancelHandler}>Cancel</Button>
        <Button onClick={addHandler}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
