import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Asset,
  AssetBalanceHistory,
  AssetTransaction,
  AssetTransactionType,
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
  const { accountId: accountIdStr, isin } = useParams<{
    accountId: string;
    isin: string;
  }>();
  const accountId = useMemo(() => {
    if (!accountIdStr) {
      return null;
    }
    return Number(accountIdStr);
  }, [accountIdStr]);
  const alert = useSnackbar();
  const navigate = useNavigate();
  const [isStockLoading, setIsStockLoading] = useState(false);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const isLoading = useMemo(() => {
    return isStockLoading || isTransactionsLoading || isHistoryLoading;
  }, [isStockLoading, isTransactionsLoading, isHistoryLoading]);
  const [stock, setStock] = useState<Asset | null>(null);
  const [assetTransactions, setAssetTransactions] = useState<
    AssetTransaction[]
  >([]);
  const [assetBalanceHistories, setAssetBalanceHistories] = useState<
    AssetBalanceHistory[]
  >([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const refreshStockData = useCallback(() => {
    setIsStockLoading(true);
    setIsTransactionsLoading(true);
    setIsHistoryLoading(true);
    if (!accountId || !isin) {
      return;
    }

    const handleError = (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
        navigate(`/accounts/${accountId}`, { replace: true });
      }
    };
    stockDetailsService
      .fetchStockBalance(accountId, isin)
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
      .fetchAssetTransactions(Number(accountId), isin)
      .then((data) => {
        setAssetTransactions(data);
        setIsTransactionsLoading(false);
      })
      .catch(handleError);
    stockDetailsService
      .fetchStockBalanceHistory(accountId, isin)
      .then((data) => {
        setAssetBalanceHistories(data);
        setIsHistoryLoading(false);
      })
      .catch(handleError);
  }, [accountId, isin, alert, stockDetailsService, navigate]);

  useEffect(() => {
    refreshStockData();
  }, [refreshStockData]);

  const onConfirmStockDialog = async (
    quantity: number,
    price: number,
    type: AssetTransactionType,
    date: Dayjs,
  ) => {
    if (!accountId || !isin) {
      return false;
    }
    try {
      await stockDetailsService.addAssetTransaction(
        accountId,
        isin,
        quantity,
        price,
        type,
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

  return {
    stock,
    assetTransactions,
    assetBalanceHistories,
    isLoading,
    openDialog: () => setDialogOpen(true),
    closeDialog: () => setDialogOpen(false),
    dialogOpen,
    onConfirmStockDialog,
  };
};
