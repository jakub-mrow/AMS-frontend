import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Account,
  AccountHistory,
  AccountPreferences,
  AccountTransaction,
  AccountTransactionType,
  Asset,
  AssetType,
  Exchange,
} from "../types.ts";
import { apiUrl } from "../config.ts";
import { AccountsDetailsService } from "./account-details-service.ts";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";
import AuthContext from "../auth/auth-context.ts";
import dayjs, { Dayjs } from "dayjs";

export enum DialogType {
  TRANSACTION,
  STOCK,
  IMPORT,
}

export const useAccountDetails = () => {
  const { token } = useContext(AuthContext);
  const accountDetailsService = useMemo(() => {
    return new AccountsDetailsService(apiUrl, token);
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
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);
  const [isExchangesLoading, setIsExchangesLoading] = useState(false);
  const isLoading = useMemo(() => {
    return (
      isAccountLoading ||
      isTransactionsLoading ||
      isAssetsLoading ||
      isExchangesLoading
    );
  }, [
    isAccountLoading,
    isTransactionsLoading,
    isAssetsLoading,
    isExchangesLoading,
  ]);
  const [account, setAccount] = useState<Account | null>(null);
  const [accountTransactions, setAccountTransactions] = useState<
    AccountTransaction[]
  >([]);
  const [stocks, setStocks] = useState<Asset[]>([]);
  const [bonds, setBonds] = useState<Asset[]>([]);
  const [deposits, setDeposits] = useState<Asset[]>([]);
  const [cryptocurrencies, setCryptocurrencies] = useState<Asset[]>([]);
  const [isAccountHistoryLoading, setIsAccountHistoryLoading] = useState(false);
  const [accountHistory, setAccountHistory] = useState<AccountHistory[]>([]);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [dialogType, setDialogType] = useState<DialogType>(
    DialogType.TRANSACTION,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAccountEditDialogOpen, setIsAccountEditDialogOpen] = useState(false);
  const [accountTransactionToEdit, setAccountTransactionToEdit] =
    useState<AccountTransaction | null>(null);

  const openDialog = useCallback((type: DialogType) => {
    setDialogType(type);
    setDialogOpen(true);
  }, []);

  const openEditAccountTransactionDialog = useCallback(
    (accountTransaction: AccountTransaction) => {
      if (!accountTransaction.isEditable()) {
        return;
      }
      setDialogType(DialogType.TRANSACTION);
      setDialogOpen(true);
      setAccountTransactionToEdit(accountTransaction);
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setAccountTransactionToEdit(null);
    setDialogOpen(false);
  }, []);

  const refreshAccountData = useCallback(() => {
    setIsAccountLoading(true);
    setIsTransactionsLoading(true);
    setIsAssetsLoading(true);
    setIsAccountHistoryLoading(true);
    setIsExchangesLoading(true);
    if (!id) {
      return;
    }

    const handleError = (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
        navigate("/", { replace: true });
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
          navigate("/", { replace: true });
        }
      });
    accountDetailsService
      .fetchAccountTransactions(Number(id))
      .then((data) => {
        setAccountTransactions(data);
        setIsTransactionsLoading(false);
      })
      .catch(handleError);
    accountDetailsService
      .fetchAssets(Number(id))
      .then((data) => {
        setStocks(data.filter((asset) => asset.type === AssetType.STOCK));
        setBonds(data.filter((asset) => asset.type === AssetType.BOND));
        setDeposits(data.filter((asset) => asset.type === AssetType.DEPOSIT));
        setCryptocurrencies(
          data.filter((asset) => asset.type === AssetType.CRYPTO),
        );
        setIsAssetsLoading(false);
      })
      .catch(handleError);
    accountDetailsService
      .fetchAccountHistory(Number(id))
      .then((data) => {
        setAccountHistory(data);
        setIsAccountHistoryLoading(false);
      })
      .catch(handleError);
    accountDetailsService
      .fetchExchanges()
      .then((data) => {
        setExchanges(data);
        setIsExchangesLoading(false);
      })
      .catch(handleError);
  }, [id, alert, accountDetailsService, navigate]);

  useEffect(() => {
    refreshAccountData();
  }, [refreshAccountData]);

  const onConfirmAccountTransactionDialog = async (
    amount: number,
    currency: string,
    type: AccountTransactionType,
    date: Dayjs,
  ) => {
    if (!account) {
      return false;
    }
    if (accountTransactionToEdit) {
      try {
        await accountDetailsService.updateAccountTransaction(
          account.id,
          accountTransactionToEdit.id,
          type,
          amount,
          currency,
          date,
        );
        refreshAccountData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
        return false;
      }
      return true;
    } else {
      try {
        await accountDetailsService.addAccountTransaction(
          account.id,
          type,
          amount,
          currency,
          date,
        );
        refreshAccountData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
        return false;
      }
      return true;
    }
  };

  const onConfirmStockDialog = async (
    type: AssetType,
    ticker: string,
    exchange: string | null,
    quantity: number,
    price: number,
    date: Dayjs,
    payCurrency: string | null,
    exchangeRate: number | null,
    commission: number | null,
  ) => {
    if (!account) {
      return false;
    }
    if (type === AssetType.STOCK && exchange) {
      try {
        await accountDetailsService.buyStocks(
          account.id,
          ticker,
          exchange,
          quantity,
          price,
          date,
          payCurrency,
          exchangeRate,
          commission,
        );
        refreshAccountData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
        return false;
      }
      return true;
    } else if (type === AssetType.CRYPTO) {
      try {
        await accountDetailsService.buyStocks(
          account.id,
          ticker,
          "CC",
          quantity,
          price,
          date,
          payCurrency,
          exchangeRate,
          commission,
        );
        refreshAccountData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
        return false;
      }
      return true;
    }
    return false;
  };

  const isDialogOpen = (type: DialogType) => {
    return dialogOpen && dialogType === type;
  };

  const onDeleteTransaction = async () => {
    if (account && accountTransactionToEdit) {
      try {
        await accountDetailsService.deleteAccountTransaction(
          account.id,
          accountTransactionToEdit.id,
        );
        refreshAccountData();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
      }
    }
  };

  const onConfirmEdit = (
    name: string,
    accountPreferences: AccountPreferences,
  ) => {
    if (!account) {
      return;
    }
    accountDetailsService
      .updateAccountPreferences(account.id, accountPreferences)
      .then(() => {
        return accountDetailsService.renameAccount(account.id, name);
      })
      .then(() => refreshAccountData())
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
      });
  };

  const goToAsset = (id: number) => {
    navigate(`./assets/${id}`, {});
  };

  const deleteAccount = async () => {
    if (!account) {
      return;
    }
    try {
      await accountDetailsService.deleteAccount(account.id);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
      }
    }
  };

  const onSendCsvFile = async (file: File) => {
    if (!account) {
      return;
    }
    try {
      const message = await accountDetailsService.sendCsvFile(account.id, file);
      alert(message, Severity.SUCCESS);
      refreshAccountData();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
      }
    }
  };

  const onSendBrokerFile = async (file: File, broker: string) => {
    try {
      const blob = await accountDetailsService.sendBrokerFile(file, broker);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${broker}-${dayjs().format("YYYY-MM-DD")}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message, Severity.ERROR);
      }
    }
  };

  return {
    account,
    accountTransactions,
    stocks,
    bonds,
    deposits,
    cryptocurrencies,
    accountHistory,
    exchanges,
    isLoading,
    isAccountHistoryLoading,
    openDialog,
    openEditAccountTransactionDialog,
    closeDialog,
    isDialogOpen,
    onConfirmAccountTransactionDialog,
    onConfirmStockDialog,
    onDeleteTransaction,
    accountTransactionToEdit,
    isAccountEditDialogOpen: isAccountEditDialogOpen,
    openAccountEditDialog: () => setIsAccountEditDialogOpen(true),
    closeAccountEditDialog: () => setIsAccountEditDialogOpen(false),
    onConfirmEdit,
    deleteAccount,
    goToAsset,
    onSendCsvFile,
    onSendBrokerFile,
  };
};
