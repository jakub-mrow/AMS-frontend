import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { isValidCurrency, isValidName } from "../util/validations.ts";
import { CURRENCIES } from "../util/currencies.ts";
import { Account, AccountPreferences } from "../types.ts";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";

interface AccountEditFormData {
  name: string;
  baseCurrency: string;
  taxCurrency: string;
}

export const AccountEditDialog = ({
  account,
  isOpen,
  onClose,
  onConfirm,
  onDelete,
}: {
  account: Account;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, accountPreferences: AccountPreferences) => void;
  onDelete: () => void;
}) => {
  const { control, handleSubmit, reset } = useForm<AccountEditFormData>({
    defaultValues: {
      name: account.name,
      baseCurrency: account.preferences.baseCurrency,
      taxCurrency: account.preferences.taxCurrency,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const deleteHandler = () => {
    setIsConfirmationOpen(true);
  };

  const onDeleteConfirm = () => {
    onDelete();
    setIsConfirmationOpen(false);
    onClose();
    reset();
  };

  const confirmHandler = handleSubmit((accountEditFormData) => {
    setIsLoading(true);
    const newName = accountEditFormData.name.trim();
    const newAccountPreferences = {
      baseCurrency: accountEditFormData.baseCurrency.trim(),
      taxCurrency: accountEditFormData.taxCurrency.trim(),
    };
    onConfirm(newName, newAccountPreferences);
    onClose();
    setIsLoading(false);
    reset({
      name: newName,
      ...newAccountPreferences,
    });
  });

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={cancelHandler}
        disableRestoreFocus
        onKeyDown={(event) => {
          if (event.key === "Enter") confirmHandler().then();
        }}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogTitle>Edit account</DialogTitle>
        <DialogContent>
          <form>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
                validate: isValidName,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={!!error}
                />
              )}
            />
            <Controller
              name="baseCurrency"
              control={control}
              rules={{
                required: true,
                validate: isValidCurrency,
              }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  onChange={(_event, newValue) => {
                    field.onChange(newValue);
                  }}
                  options={CURRENCIES}
                  fullWidth
                  autoHighlight
                  autoSelect
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.stopPropagation();
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      autoFocus
                      margin="normal"
                      label="Base currency"
                      variant="standard"
                      error={!!error}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="taxCurrency"
              control={control}
              rules={{
                required: true,
                validate: isValidCurrency,
              }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  onChange={(_event, newValue) => {
                    field.onChange(newValue);
                  }}
                  options={CURRENCIES}
                  fullWidth
                  autoHighlight
                  autoSelect
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.stopPropagation();
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      label="Tax currency"
                      variant="standard"
                      error={!!error}
                    />
                  )}
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteHandler} color="error">
            Delete
          </Button>
          <Button onClick={cancelHandler} color="secondary">
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={confirmHandler}
            variant="outlined"
          >
            <span>Confirm</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={onDeleteConfirm}
        content={`Are you sure you want to delete account ${account.name}?`}
      />
    </>
  );
};
