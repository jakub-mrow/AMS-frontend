export type Wallet = {
  id: number;
  currency: string;
};

const wallets: Wallet[] = [
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
  return {wallets};
};
