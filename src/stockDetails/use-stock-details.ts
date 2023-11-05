import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Account, AccountTransaction } from "../accounts/types.ts";
import { apiUrl } from "../config.ts";
import { StockDetailsService } from "./stock-details-service.ts";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";
import AuthContext from "../auth/auth-context.ts";
import { Dayjs } from "dayjs";

export enum DialogType {
  TRANSACTION,
}

export const useStockDetails = () => {
  const { token } = useContext(AuthContext);
  const accountDetailsService = useMemo(() => {
    return new StockDetailsService(apiUrl, token);
  }, [token]);
  const { id: idStr } = useParams<{
    id: string;
  }>();
  const id = useMemo(() => {
    if (!idStr) {
      return null;
    }
    return Number(idStr);
  }, [idStr]);
  const alert = useSnackbar();
  const navigate = useNavigate();
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const isLoading = useMemo(() => {
    return isAccountLoading || isTransactionsLoading;
  }, [isAccountLoading, isTransactionsLoading]);
  const [account, setAccount] = useState<Account | null>(null);
  const [accountTransactions, setAccountTransactions] = useState<
    AccountTransaction[]
  >([]);
  const [dialogType, setDialogType] = useState<DialogType>(
    DialogType.TRANSACTION,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = useCallback((type: DialogType) => {
    setDialogType(type);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const refreshAccountData = useCallback(() => {
    setIsAccountLoading(true);
    setIsTransactionsLoading(true);
    if (!id) {
      return;
    }

    const handleError = (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
        navigate("/accounts", { replace: true });
      }
    };
    accountDetailsService
      .fetchAccount(Number(id))
      .then((data) => {
        setAccount(data);
        setIsAccountLoading(false);
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          navigate("/accounts", { replace: true });
        }
      });
    accountDetailsService
      .fetchAccountTransactions(Number(id))
      .then((data) => {
        setAccountTransactions(data);
        setIsTransactionsLoading(false);
      })
      .catch(handleError);
  }, [id, alert, accountDetailsService, navigate]);

  useEffect(() => {
    refreshAccountData();
  }, [refreshAccountData]);

  const onConfirmStockDialog = async (
    quantity: number,
    price: number,
    date: Dayjs,
  ) => {
    if (!account) {
      return false;
    }
    try {
      await accountDetailsService.buyStocks(
        account.id,
        "PKN", //TODO
        "WAR", //TODO
        quantity,
        price,
        date,
      );
      refreshAccountData();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
        return false;
      }
    }
    return true;
  };

  const isDialogOpen = (type: DialogType) => {
    return dialogOpen && dialogType === type;
  };

  const onDeleteTransaction = (transaction: AccountTransaction) => {
    if (account) {
      accountDetailsService
        .deleteAccountTransaction(account.id, transaction.id)
        .then(() => refreshAccountData())
        .catch((error) => {
          if (error instanceof Error) {
            alert(error.message, Severity.ERROR);
          }
        });
    }
  };

  return {
    stock: account,
    stockTransactions: accountTransactions,
    isLoading,
    openDialog,
    closeDialog,
    isDialogOpen,
    onConfirmStockDialog,
    onDeleteTransaction,
  };
};
