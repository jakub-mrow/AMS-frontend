import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AssetTransaction, AssetTransactionType, AssetType } from "../types.ts";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  isValidCurrency,
  isValidNumber,
  moneyPattern,
  quantityPattern,
} from "../util/validations.ts";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";
import { CURRENCIES } from "../util/currencies.ts";

interface StockTransactionFormData {
  quantity: number | null;
  price: number | null;
  type: AssetTransactionType;
  date: Dayjs | null;
  payCurrency: string | null;
  exchangeRate: number | null;
  commission: number | null;
}

export const AssetTransactionDialog = ({
  isOpen,
  type,
  onClose,
  onConfirm,
  onDelete,
  transactionToEdit,
}: {
  isOpen: boolean;
  type: AssetType;
  onClose: () => void;
  onConfirm: (
    quantity: number,
    price: number,
    type: AssetTransactionType,
    date: Dayjs,
    payCurrency: string | null,
    exchangeRate: number | null,
    commission: number | null,
  ) => Promise<boolean>;
  onDelete: () => Promise<void>;
  transactionToEdit: AssetTransaction | null;
}) => {
  const { control, handleSubmit, reset, watch } =
    useForm<StockTransactionFormData>({
      defaultValues: {
        quantity: transactionToEdit ? transactionToEdit.quantity : null,
        price: transactionToEdit ? transactionToEdit.price : null,
        type: transactionToEdit
          ? transactionToEdit.type
          : AssetTransactionType.BUY,
        date: transactionToEdit ? dayjs(transactionToEdit.date) : dayjs(),
        payCurrency: transactionToEdit ? transactionToEdit.payCurrency : null,
        exchangeRate: transactionToEdit ? transactionToEdit.exchangeRate : null,
        commission: transactionToEdit ? transactionToEdit.commission : null,
      },
    });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const isDividend = watch("type") === AssetTransactionType.DIVIDEND;

  useEffect(() => {
    reset({
      quantity: transactionToEdit ? transactionToEdit.quantity : null,
      price: transactionToEdit ? transactionToEdit.price : null,
      type: transactionToEdit
        ? transactionToEdit.type
        : AssetTransactionType.BUY,
      date: transactionToEdit ? dayjs(transactionToEdit.date) : dayjs(),
      payCurrency: transactionToEdit ? transactionToEdit.payCurrency : null,
      exchangeRate: transactionToEdit ? transactionToEdit.exchangeRate : null,
      commission: transactionToEdit ? transactionToEdit.commission : null,
    });
  }, [reset, transactionToEdit]);

  const cancelHandler = () => {
    onClose();
    reset();
  };

  const deleteHandler = () => {
    setIsConfirmationOpen(true);
  };

  const onDeleteConfirm = () => {
    setIsDeleteLoading(true);
    setIsConfirmationOpen(false);
    onDelete().then(() => {
      setIsDeleteLoading(false);
      onClose();
      reset();
    });
  };

  const confirmHandler = handleSubmit((data) => {
    if (data.price === null || data.date === null) {
      return;
    }
    let payCurrency = null;
    let exchangeRate = null;
    if (data.payCurrency !== null) {
      if (isDividend) {
        payCurrency = data.payCurrency;
        exchangeRate = null;
      }
      if (data.exchangeRate !== null) {
        payCurrency = data.payCurrency;
        exchangeRate = data.exchangeRate;
      }
    }
    let quantity = data.quantity ?? 0;
    let commission = data.commission;
    if (isDividend) {
      quantity = 0;
      commission = null;
    }
    setIsLoading(true);
    onConfirm(
      quantity,
      data.price,
      data.type,
      data.date,
      payCurrency,
      exchangeRate,
      commission,
    ).then((success) => {
      if (success) {
        onClose();
        setIsLoading(false);
        reset();
      }
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
      >
        <DialogTitle>Buy stocks</DialogTitle>
        <DialogContent>
          <form>
            <FormControl>
              <FormLabel id="type">Type</FormLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value={"buy"}
                      control={<Radio />}
                      label="Buy"
                    />
                    <FormControlLabel
                      value={"sell"}
                      control={<Radio />}
                      label="Sell"
                    />
                    {type === AssetType.STOCK && (
                      <FormControlLabel
                        value={"dividend"}
                        control={<Radio />}
                        label="Dividend"
                      />
                    )}
                  </RadioGroup>
                )}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth variant="standard">
              <FormLabel id="date">Date</FormLabel>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                defaultValue={null}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    slotProps={{
                      textField: {
                        variant: "standard",
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <Controller
              name="quantity"
              disabled={isDividend}
              control={control}
              rules={{
                required: !isDividend,
                validate: (quantity) => isDividend || isValidNumber(quantity),
                pattern: isDividend ? undefined : quantityPattern,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="normal"
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="standard"
                  error={!!error}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              rules={{
                required: true,
                validate: isValidNumber,
                pattern: moneyPattern,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label={isDividend ? "Amount" : "Price"}
                  type="number"
                  inputProps={{
                    step: 0.01,
                  }}
                  fullWidth
                  variant="standard"
                  error={!!error}
                />
              )}
            />
            <Box sx={{ display: "flex" }}>
              <Controller
                name="payCurrency"
                control={control}
                rules={{
                  required: false,
                  validate: (currency) =>
                    currency === null || isValidCurrency(currency),
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
                    sx={{ mr: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        label="Pay currency"
                        variant="standard"
                        error={!!error}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="exchangeRate"
                disabled={isDividend}
                control={control}
                rules={{
                  required: false,
                  validate: (exchangeRate) =>
                    isDividend ||
                    exchangeRate === null ||
                    isValidNumber(exchangeRate),
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    label="Exchange rate"
                    type="number"
                    inputProps={{
                      step: 0.001,
                    }}
                    fullWidth
                    variant="standard"
                    error={!!error}
                  />
                )}
              />
            </Box>
            <Controller
              name="commission"
              disabled={isDividend}
              control={control}
              rules={{
                required: false,
                validate: (commission) =>
                  isDividend ||
                  commission === null ||
                  isValidNumber(commission),
                pattern: isDividend ? undefined : moneyPattern,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  margin="normal"
                  label="Commission"
                  type="number"
                  inputProps={{
                    step: 0.01,
                  }}
                  fullWidth
                  variant="standard"
                  error={!!error}
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {transactionToEdit && (
            <LoadingButton
              loading={isDeleteLoading}
              onClick={deleteHandler}
              color="error"
            >
              Delete
            </LoadingButton>
          )}
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
        content={`Are you sure you want to delete this transaction?`}
      />
    </>
  );
};
