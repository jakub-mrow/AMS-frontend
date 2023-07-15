import { useCallback, useState } from "react";

export type Wallet = {
  id?: number;
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

  const addWallet = useCallback((wallet: Wallet) => {
    setWallets((prevWallets) => {
      wallet.id = prevWallets.length + 1;
      return [...prevWallets, wallet];
    });
  }, []);

  return { wallets, openAddDialog, closeAddDialog, isAddDialogOpen, addWallet };
};
