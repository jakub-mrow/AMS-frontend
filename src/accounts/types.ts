export type Account = {
  id: number;
  userId: number;
  name: string;
  balances: AccountBalance[];
};

export type AccountBalance = {
  currency: string;
  amount: number;
};
