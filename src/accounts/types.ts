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

export enum AccountTransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

export type AccountTransaction = {
  id: number;
  type: AccountTransactionType;
  amount: number;
  currency: string;
  date: Date;
};
