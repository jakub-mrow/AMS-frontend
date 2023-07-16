import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Wallet } from "./use-wallets";
import useInput from "../util/use-input";
import { useEffect } from "react";

export const UpdateWalletDialog = ({
  isOpen,
  onClose,
  onUpdate,
  walletToUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (wallet: Wallet) => void;
  walletToUpdate: Wallet;
}) => {
  const currencyInput = useInput(
    (value) => value.trim().length > 0,
    walletToUpdate.currency
  );

  useEffect(() => {
    currencyInput.reset();
  }, [walletToUpdate.currency]);

  const cancelHandler = () => {
    onClose();
    currencyInput.reset();
  };

  const updateHandler = () => {
    if (!currencyInput.isValid) return;
    onUpdate({ id: walletToUpdate.id, currency: currencyInput.value });
    onClose();
    currencyInput.reset();
  };

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Update wallet</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter new currency for wallet.</DialogContentText>
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
