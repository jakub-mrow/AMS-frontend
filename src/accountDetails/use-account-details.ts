import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Account,
  AccountTransaction,
  AccountTransactionType,
} from "../accounts/types.ts";
import { apiUrl } from "../config.ts";
import { AccountsDetailsService } from "./account-details-service.ts";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";
import { Asset } from "./assets-mock.ts";
import AuthContext from "../auth/auth-context.ts";
import { Dayjs } from "dayjs";
import { AccountPreferences, DEFAULT_ACCOUNT_PREFERENCES } from "./types.ts";

export enum DialogType {
  TRANSACTION,
}

export const useAccountDetails = () => {
  const { token } = useContext(AuthContext);
  const accountDetailsService = useMemo(() => {
    return new AccountsDetailsService(apiUrl, token);
  }, [token]);
  const { id: idStr } = useParams<{ id: string }>();
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
  const [isAccountPreferencesLoading, setIsAccountPreferencesLoading] =
    useState(false);
  const isLoading = useMemo(() => {
    return (
      isAccountLoading ||
      isTransactionsLoading ||
      isAssetsLoading ||
      isAccountPreferencesLoading
    );
  }, [
    isAccountLoading,
    isTransactionsLoading,
    isAssetsLoading,
    isAccountPreferencesLoading,
  ]);
  const [account, setAccount] = useState<Account | null>(null);
  const [accountTransactions, setAccountTransactions] = useState<
    AccountTransaction[]
  >([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [accountPreferences, setAccountPreferences] =
    useState<AccountPreferences>(DEFAULT_ACCOUNT_PREFERENCES);
  const [dialogType, setDialogType] = useState<DialogType>(
    DialogType.TRANSACTION,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAccountPreferencesDialogOpen, setIsAccountPreferencesDialogOpen] =
    useState(false);

  const openDialog = useCallback((type: DialogType) => {
    setDialogType(type);
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const refreshAccountData = useCallback(() => {
    setIsAccountLoading(true);
    setIsTransactionsLoading(true);
    setIsAssetsLoading(true);
    setIsAccountPreferencesLoading(true);
    if (!id) {
      return;
    }
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
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          navigate("/accounts", { replace: true });
        }
      });
    accountDetailsService
      .fetchAssets()
      .then((data) => {
        setAssets(data);
        setIsAssetsLoading(false);
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          navigate("/accounts", { replace: true });
        }
      });
    accountDetailsService
      .fetchAccountPreferences(Number(id))
      .then((data) => {
        setAccountPreferences(data);
        setIsAccountPreferencesLoading(false);
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          navigate("/accounts", { replace: true });
        }
      });
  }, [id, alert, accountDetailsService, navigate]);

  useEffect(() => {
    refreshAccountData();
  }, [refreshAccountData]);

  const onConfirmDialog = (
    amount: number,
    currency: string,
    type: AccountTransactionType,
    date: Dayjs,
  ) => {
    if (account) {
      accountDetailsService
        .addAccountTransaction(account.id, type, amount, currency, date)
        .then(() => refreshAccountData())
        .catch((error) => {
          if (error instanceof Error) {
            alert(error.message, Severity.ERROR);
          }
        });
    }
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

  const onConfirmPreferences = (accountPreferences: AccountPreferences) => {
    if (!account) {
      return;
    }
    accountDetailsService
      .updateAccountPreferences(account.id, accountPreferences)
      .then(() => refreshAccountData())
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
      });
  };

  return {
    account,
    accountTransactions,
    assets,
    accountPreferences,
    isLoading,
    openDialog,
    closeDialog,
    dialogType,
    isDialogOpen,
    onConfirmDialog,
    onDeleteTransaction,
    isAccountPreferencesDialogOpen,
    openAccountPreferencesDialog: () => setIsAccountPreferencesDialogOpen(true),
    closeAccountPreferencesDialog: () =>
      setIsAccountPreferencesDialogOpen(false),
    onConfirmPreferences,
  };
};
