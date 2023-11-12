import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiUrl } from "../config.ts";
import { useNavigate } from "react-router-dom";
import { AccountInput, AccountsService } from "./accounts-service.ts";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";
import AuthContext from "../auth/auth-context.ts";
import { Account } from "../types.ts";

export type UpdateDialogData = {
  isOpen: boolean;
  account: Account;
};

export const useAccounts = () => {
  const { token } = useContext(AuthContext);
  const accountsService = useMemo(() => {
    return new AccountsService(apiUrl, token);
  }, [token]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [updateDialogData, setUpdateDialogData] = useState<UpdateDialogData>({
    isOpen: false,
    account: { id: 0, userId: 1, name: "", balances: [] },
  });
  const alert = useSnackbar();
  const navigate = useNavigate();

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

  const openAddDialog = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  const closeAddDialog = useCallback(() => {
    setIsAddDialogOpen(false);
  }, []);

  const openUpdateDialog = useCallback((account: Account) => {
    setUpdateDialogData({ isOpen: true, account: account });
  }, []);

  const closeUpdateDialog = useCallback(() => {
    setUpdateDialogData({
      isOpen: false,
      account: { id: 0, userId: 1, name: "", balances: [] },
    });
  }, []);

  const addAccount = useCallback(
    async (account: AccountInput) => {
      try {
        await accountsService.postAccount(account);
        const newAccounts = await accountsService.fetchAccounts();
        setAccounts(newAccounts);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
      }
    },
    [accountsService, alert],
  );

  const removeAccount = useCallback(
    async (accountId: number) => {
      try {
        await accountsService.deleteAccount(accountId);
        const newAccounts = await accountsService.fetchAccounts();
        setAccounts(newAccounts);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
      }
    },
    [accountsService, alert],
  );

  const updateAccount = useCallback(
    async (account: Account, newName: string) => {
      try {
        await accountsService.renameAccount(account, newName);
        const newAccounts = await accountsService.fetchAccounts();
        setAccounts(newAccounts);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
        }
      }
    },
    [accountsService, alert],
  );

  const goToAccount = useCallback(
    (accountId: number) => {
      navigate(`/accounts/${accountId}`);
    },
    [navigate],
  );

  return {
    accounts,
    openAddDialog,
    closeAddDialog,
    isAddDialogOpen,
    openUpdateDialog,
    closeUpdateDialog,
    updateDialogData,
    addAccount,
    removeAccount,
    updateAccount,
    goToAccount,
  };
};
