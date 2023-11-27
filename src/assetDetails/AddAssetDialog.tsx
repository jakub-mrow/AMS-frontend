import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Account } from "../types";

interface StockTransactionFormData {
    accountId: number | null;
    ticker: string | null;
    exchange: string | null;
    quantity: number;
    price: number;
    date: Dayjs | null;
}

export const AddAssetDialog = ({
    accounts,
    assetTicker,
    exchange,
    isOpen,
    onClose,
    onConfirm,
}: {
    accounts: Account[];
    assetTicker: string;
    exchange: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        accountId: number,
        ticker: string,
        exchange: string,
        quantity: number,
        price: number,
        date: Dayjs,
    ) => Promise<boolean>;
}) => {
    const { control, handleSubmit, reset } = useForm<StockTransactionFormData>({
        defaultValues: {
            accountId: null,
            ticker: assetTicker,
            exchange: exchange,
            quantity: 0,
            price: 0,
            date: dayjs() as Dayjs | null,
        },
    });
    const cancelHandler = () => {
        onClose();
        reset();
    };

    const confirmHandler = handleSubmit((data) => {
        if (data.ticker === null || data.exchange === null || data.date === null || data.accountId === null) {
            return;
        }
        console.log(data);
        onConfirm(
            data.accountId,
            data.ticker.trim(),
            data.exchange.trim(),
            data.quantity,
            data.price,
            data.date,
        ).then((success) => {
            if (success) {
                onClose();
                reset();
            }
        });
    });

    return (
        <Dialog open={isOpen} onClose={cancelHandler}>
            <DialogTitle>Buy stocks</DialogTitle>
            <DialogContent>
                <form>
                    <FormControl margin="normal" fullWidth variant="standard">
                        <FormLabel id="account">Account</FormLabel>
                        <Controller
                            name="accountId"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={null}
                            render={({ field }) => (
                                <Select {...field} label="Accounts">
                                    {accounts.map((account) => (
                                        <MenuItem key={account.id} value={account.id}>
                                            {account.name}
                                        </MenuItem>
                                    ))}
                                </Select>
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
                        control={control}
                        rules={{
                            required: true,
                            validate: (quantity) => quantity > 0,
                            pattern: /^[0-9]*$/,
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
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
                            validate: (price) => price > 0,
                            pattern: /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,2}$/,
                        }}
                        render={({ field, fieldState: { error } }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                label="Price"
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
                <Button onClick={cancelHandler} color="secondary">
                    Cancel
                </Button>
                <Button onClick={confirmHandler}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};
