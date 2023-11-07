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
import { isValidCurrency } from "../util/validations.ts";
import { CURRENCIES } from "../util/currencies.ts";
import { AccountPreferences } from "./types.ts";

interface AccountPreferencesFormData {
  baseCurrency: string;
  taxCurrency: string;
}

export const AccountPreferencesDialog = ({
  isOpen,
  onClose,
  onConfirm,
  currentPreferences,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (accountPreferences: AccountPreferences) => void;
  currentPreferences: AccountPreferences;
}) => {
  const { control, handleSubmit, reset } = useForm<AccountPreferencesFormData>({
    defaultValues: {
      ...currentPreferences,
    },
  });

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const confirmHandler = handleSubmit((accountPreferencesFormData) => {
    const newAccountPreferences = {
      baseCurrency: accountPreferencesFormData.baseCurrency.trim(),
      taxCurrency: accountPreferencesFormData.taxCurrency.trim(),
    };
    onConfirm(newAccountPreferences);
    onClose();
    reset(newAccountPreferences);
  });

  return (
    <Dialog open={isOpen} onClose={cancelHandler}>
      <DialogTitle>Edit account preferences</DialogTitle>
      <DialogContent>
        <form>
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
        <Button onClick={confirmHandler}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
