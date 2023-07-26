import { useCallback, useMemo, useState } from "react";

export type AccountInput = {
  name: string;
};

export type Account = {
  id: number;
  userId: number;
  name: string;
};

export type UpdateDialogData = {
  isOpen: boolean;
  account: Account;
};

const accountsData: Account[] = [
  {
    id: 1,
    userId: 1,
    name: "Retirement",
  },
  {
    id: 2,
    userId: 1,
    name: "Savings",
  },
];

export const useAccounts = () => {
  const userId = useMemo(() => {
    return 1;
  }, []);
  const [accounts, setAccounts] = useState(accountsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [updateDialogData, setUpdateDialogData] = useState<UpdateDialogData>({
    isOpen: false,
    account: { id: 0, userId: userId, name: "" },
  });

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
      account: { id: 0, userId: userId, name: "" },
    });
  }, [userId]);

  const addAccount = useCallback(
    (account: AccountInput) => {
      setAccounts((prevAccounts) => {
        const maxId = prevAccounts.reduce((prev, current) => {
          return prev.id > current.id ? prev : current;
        }).id;

        return [...prevAccounts, { id: maxId + 1, userId: userId, ...account }];
      });
    },
    [userId],
  );

  const removeAccount = useCallback((accountId: number) => {
    setAccounts((prevAccounts) => {
      return prevAccounts.filter((account) => account.id !== accountId);
    });
  }, []);

  const updateAccount = useCallback((account: Account) => {
    setAccounts((prevAccounts) => {
      return prevAccounts.map((prevAccount) => {
        if (prevAccount.id === account.id) {
          return account;
        }
        return prevAccount;
      });
    });
  }, []);

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
  };
};
