import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content: string;
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
