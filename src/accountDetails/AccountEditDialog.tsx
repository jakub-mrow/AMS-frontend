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
import { AccountPreferences } from "../types.ts";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

interface AccountEditFormData {
  name: string;
  baseCurrency: string;
  taxCurrency: string;
}

export const AccountEditDialog = ({
  isOpen,
  onClose,
  onConfirm,
  currentName,
  currentPreferences,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, accountPreferences: AccountPreferences) => void;
  currentName: string;
  currentPreferences: AccountPreferences;
}) => {
  const { control, handleSubmit, reset } = useForm<AccountEditFormData>({
    defaultValues: {
      name: currentName,
      ...currentPreferences,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const cancelHandler = () => {
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
    <Dialog
      open={isOpen}
      onClose={cancelHandler}
      disableRestoreFocus
      onKeyUp={(event) => {
        if (event.key === "Enter") confirmHandler().then();
      }}
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
  );
};
