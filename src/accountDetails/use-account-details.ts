import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Account,
  AccountTransaction,
  AccountTransactionType,
} from "../accounts/types.ts";
import { useAuth } from "../util/use-auth.ts";
import { apiUrl } from "../config.ts";
import { AccountsDetailsService } from "./account-details-service.ts";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";
import { Asset } from "./assets-mock.ts";

export enum DialogType {
  DEPOSIT,
  WITHDRAWAL,
}

export const useAccountDetails = () => {
  const { token } = useAuth(); //TODO remove after getting token
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
  const isLoading = useMemo(() => {
    return isAccountLoading || isTransactionsLoading || isAssetsLoading;
  }, [isAccountLoading, isTransactionsLoading, isAssetsLoading]);
  const [account, setAccount] = useState<Account | null>(null);
  const [accountTransactions, setAccountTransactions] = useState<
    AccountTransaction[]
  >([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [dialogType, setDialogType] = useState<DialogType>(DialogType.DEPOSIT);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
  }, [id, alert, accountDetailsService, navigate]);

  useEffect(() => {
    refreshAccountData();
  }, [refreshAccountData]);

  const onConfirmDialog = (
    amount: number,
    currency: string,
    type: AccountTransactionType,
  ) => {
    if (account) {
      accountDetailsService
        .addAccountTransaction(account.id, type, amount, currency)
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

  return {
    account,
    accountTransactions,
    assets,
    isLoading,
    openDialog,
    closeDialog,
    dialogType,
    isDialogOpen,
    onConfirmDialog,
    onDeleteTransaction,
  };
};
