import { useCallback, useState } from "react";

export type WalletInput = {
  currency: string;
};

export type Wallet = {
  id: number;
  currency: string;
};

export type UpdateDialogData = {
  isOpen: boolean;
  wallet: Wallet;
};

const walletsData: Wallet[] = [
  {
    id: 1,
    currency: "PLN",
  },
  {
    id: 2,
    currency: "EUR",
  },
];

export const useWallets = () => {
  const [wallets, setWallets] = useState(walletsData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [updateDialogData, setUpdateDialogData] = useState<UpdateDialogData>({
    isOpen: false,
    wallet: { id: 0, currency: "" },
  });

  const openAddDialog = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  const closeAddDialog = useCallback(() => {
    setIsAddDialogOpen(false);
  }, []);

  const openUpdateDialog = useCallback((wallet: Wallet) => {
    setUpdateDialogData({ isOpen: true, wallet: wallet });
  }, []);

  const closeUpdateDialog = useCallback(() => {
    setUpdateDialogData({ isOpen: false, wallet: { id: 0, currency: "" } });
  }, []);

  const addWallet = useCallback((wallet: WalletInput) => {
    setWallets((prevWallets) => {
      const maxId = prevWallets.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      }).id;

      return [...prevWallets, { id: maxId + 1, ...wallet }];
    });
  }, []);

  const removeWallet = useCallback((walletId: number) => {
    setWallets((prevWallets) => {
      return prevWallets.filter((wallet) => wallet.id !== walletId);
    });
  }, []);

  const updateWallet = useCallback((wallet: Wallet) => {
    setWallets((prevWallets) => {
      return prevWallets.map((prevWallet) => {
        if (prevWallet.id === wallet.id) {
          return wallet;
        }
        return prevWallet;
      });
    });
  }, []);

  return {
    wallets,
    openAddDialog,
    closeAddDialog,
    isAddDialogOpen,
    openUpdateDialog,
    closeUpdateDialog,
    updateDialogData,
    addWallet,
    removeWallet,
    updateWallet,
  };
};
