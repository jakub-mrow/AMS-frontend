import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "../auth/auth-context";
import { AccountsDetailsService } from "../accountDetails/account-details-service";
import { apiUrl } from "../config";
import { useSnackbar } from "../snackbar/use-snackbar";
import { Dayjs } from "dayjs";
import { Severity } from "../snackbar/snackbar-context";
import { Account } from "../types";
import { AccountsService } from "../home/accounts-service";


export enum DialogType {
    TRANSACTION,
    STOCK,
}

export const useAddAsset = () => {
    const { token } = useContext(AuthContext);
    const accountDetailsService = useMemo(() => {
        return new AccountsDetailsService(apiUrl, token);
    }, [token]);

    const accountsService = useMemo(() => {
        return new AccountsService(apiUrl, token);
    }, [token]);

    const alert = useSnackbar();

    const [dialogType, setDialogType] = useState<DialogType>(
        DialogType.TRANSACTION,
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);


    useEffect(() => {
        accountsService
            .fetchAccounts()
            .then((data) => {
                setAccounts(data);
            })
            .catch((error) => {
                if (error instanceof Error) {
                    alert(error.message, Severity.ERROR);
                }
            });
    }, [alert, accountsService]);


    const onConfirmStockDialog = async (
        accountId: number,
        ticker: string,
        exchange: string,
        quantity: number,
        price: number,
        date: Dayjs,
    ) => {
        try {
            await accountDetailsService.buyStocks(
                accountId,
                ticker,
                exchange,
                quantity,
                price,
                date,
            );
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message, Severity.ERROR);
                return false;
            }
        }
        alert(`Asset ${ticker} has been added to the account`, Severity.SUCCESS);
        return true;
    };

    const isDialogOpen = (type: DialogType) => {
        return dialogOpen && dialogType === type;
    };

    const openDialog = useCallback((type: DialogType) => {
        setDialogType(type);
        setDialogOpen(true);
    }, []);

    const closeDialog = useCallback(() => {
        setDialogOpen(false);
    }, []);


    return {
        accounts,
        isDialogOpen,
        closeDialog,
        openDialog,
        onConfirmStockDialog,
    }

}