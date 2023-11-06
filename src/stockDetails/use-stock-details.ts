import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountTransaction, Asset } from "../types.ts";
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
  const { id: idStr, isin } = useParams<{
    id: string;
    isin: string;
  }>();
  const id = useMemo(() => {
    if (!idStr) {
      return null;
    }
    return Number(idStr);
  }, [idStr]);
  const alert = useSnackbar();
  const navigate = useNavigate();
  const [isStockLoading, setIsStockLoading] = useState(false);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const isLoading = useMemo(() => {
    return isStockLoading || isTransactionsLoading;
  }, [isStockLoading, isTransactionsLoading]);
  const [stock, setStock] = useState<Asset | null>(null);
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

  const refreshStockData = useCallback(() => {
    setIsStockLoading(true);
    setIsTransactionsLoading(true);
    if (!id || !isin) {
      return;
    }

    const handleError = (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
        navigate("/accounts", { replace: true });
      }
    };
    accountDetailsService
      .fetchStockBalance(id, isin)
      .then((data) => {
        setStock(data);
        setIsStockLoading(false);
      })
      .catch(handleError);
    accountDetailsService
      .fetchAccountTransactions(Number(id))
      .then((data) => {
        setAccountTransactions(data);
        setIsTransactionsLoading(false);
      })
      .catch(handleError);
  }, [id, alert, accountDetailsService, navigate]);

  useEffect(() => {
    refreshStockData();
  }, [refreshStockData]);

  const onConfirmStockDialog = async (
    quantity: number,
    price: number,
    date: Dayjs,
  ) => {
    if (!id || !stock) {
      return false;
    }
    try {
      await accountDetailsService.buyStocks(
        id,
        "PKN", //TODO
        "WAR", //TODO
        quantity,
        price,
        date,
      );
      refreshStockData();
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
    if (id) {
      accountDetailsService
        .deleteAccountTransaction(id, transaction.id)
        .then(() => refreshStockData())
        .catch((error) => {
          if (error instanceof Error) {
            alert(error.message, Severity.ERROR);
          }
        });
    }
  };

  return {
    stock,
    stockTransactions: accountTransactions,
    isLoading,
    openDialog,
    closeDialog,
    isDialogOpen,
    onConfirmStockDialog,
    onDeleteTransaction,
  };
};
