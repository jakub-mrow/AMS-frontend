import { useCallback, useState } from "react";

export type WalletInput = {
  currency: string;
};

export type Wallet = {
  id: number;
  currency: string;
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

  const openAddDialog = useCallback(() => {
    setIsAddDialogOpen(true);
  }, []);

  const closeAddDialog = useCallback(() => {
    setIsAddDialogOpen(false);
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

  return {
    wallets,
    openAddDialog,
    closeAddDialog,
    isAddDialogOpen,
    addWallet,
    removeWallet,
  };
};
