import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Asset,
  AssetBalanceHistory,
  AssetTransaction,
  AssetTransactionType,
  BaseStockValue,
} from "../types.ts";
import { apiUrl } from "../config.ts";
import { StockDetailsService } from "./stock-details-service.ts";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";
import AuthContext from "../auth/auth-context.ts";
import { Dayjs } from "dayjs";

export const useStockDetails = () => {
  const { token } = useContext(AuthContext);
  const stockDetailsService = useMemo(() => {
    return new StockDetailsService(apiUrl, token);
  }, [token]);
  const { accountId: accountIdStr, id: idStr } = useParams<{
    accountId: string;
    id: string;
  }>();
  const accountId = useMemo(() => {
    if (!accountIdStr) {
      return null;
    }
    return Number(accountIdStr);
  }, [accountIdStr]);
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
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isBaseStockValueLoading, setIsBaseStockValueLoading] = useState(false);
  const isLoading = useMemo(() => {
    return (
      isStockLoading ||
      isTransactionsLoading ||
      isHistoryLoading ||
      isBaseStockValueLoading
    );
  }, [
    isStockLoading,
    isTransactionsLoading,
    isHistoryLoading,
    isBaseStockValueLoading,
  ]);
  const [stock, setStock] = useState<Asset | null>(null);
  const [assetTransactions, setAssetTransactions] = useState<
    AssetTransaction[]
  >([]);
  const [assetBalanceHistories, setAssetBalanceHistories] = useState<
    AssetBalanceHistory[]
  >([]);
  const [baseStockValue, setBaseStockValue] = useState<BaseStockValue | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assetTransactionToEdit, setAssetTransactionToEdit] =
    useState<AssetTransaction | null>(null);

  const refreshStockData = useCallback(() => {
    setIsStockLoading(true);
    setIsTransactionsLoading(true);
    setIsHistoryLoading(true);
    setIsBaseStockValueLoading(true);
    if (!accountId || !id) {
      return;
    }

    const handleError = (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
        navigate(`/accounts/${accountId}`, { replace: true });
      }
    };
    stockDetailsService
      .fetchStockBalance(accountId, id)
      .then((data) => {
        if (data.quantity === 0) {
          navigate(`/accounts/${accountId}`, { replace: true });
          return;
        }
        setStock(data);
        setIsStockLoading(false);
      })
      .catch(handleError);
    stockDetailsService
      .fetchAssetTransactions(Number(accountId), id)
      .then((data) => {
        setAssetTransactions(data);
        setIsTransactionsLoading(false);
      })
      .catch(handleError);
    stockDetailsService
      .fetchStockBalanceHistory(accountId, id)
      .then((data) => {
        setAssetBalanceHistories(data);
        setIsHistoryLoading(false);
      })
      .catch(handleError);
    stockDetailsService
      .fetchBaseStockValue(accountId, id)
      .then((data) => {
        setBaseStockValue(data);
        setIsBaseStockValueLoading(false);
      })
      .catch(handleError);
  }, [accountId, id, alert, stockDetailsService, navigate]);

  useEffect(() => {
    refreshStockData();
  }, [refreshStockData]);

  const onConfirmStockDialog = async (
    quantity: number,
    price: number,
    type: AssetTransactionType,
    date: Dayjs,
    payCurrency: string | null,
    exchangeRate: number | null,
    commission: number | null,
  ) => {
    if (!accountId || !id) {
      return false;
    }
    if (assetTransactionToEdit) {
      try {
        await stockDetailsService.updateAssetTransaction(
          accountId,
          assetTransactionToEdit.id,
          id,
          quantity,
          price,
          type,
          date,
          payCurrency,
          exchangeRate,
          commission,
        );
        refreshStockData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          return false;
        }
      }
    } else {
      try {
        await stockDetailsService.addAssetTransaction(
          accountId,
          id,
          quantity,
          price,
          type,
          date,
          payCurrency,
          exchangeRate,
          commission,
        );
        refreshStockData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          return false;
        }
      }
    }
    return true;
  };

  const onDeleteTransaction = async () => {
    if (accountId && assetTransactionToEdit) {
      try {
        await stockDetailsService.deleteAssetTransaction(
          accountId,
          assetTransactionToEdit.id,
        );
        refreshStockData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
      }
    }
  };

  return {
    stock,
    assetTransactions,
    assetBalanceHistories,
    baseStockValue,
    assetTransactionToEdit,
    isLoading,
    openDialog: () => setDialogOpen(true),
    closeDialog: () => {
      setAssetTransactionToEdit(null);
      setDialogOpen(false);
    },
    openEditDialog: (transaction: AssetTransaction) => {
      setAssetTransactionToEdit(transaction);
      setDialogOpen(true);
    },
    dialogOpen,
    onConfirmStockDialog,
    onDeleteTransaction,
  };
};
