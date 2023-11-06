import { exhaustiveGuard } from "./util/exhaustive-switch.ts";

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

export type AccountPreferences = {
  baseCurrency: string;
  taxCurrency: string;
};

export const DEFAULT_ACCOUNT_PREFERENCES: AccountPreferences = {
  baseCurrency: "PLN",
  taxCurrency: "PLN",
};

export class Asset {
  constructor(
    public isin: string,
    public name: string,
    public ticker: string,
    public exchange: string,
    public quantity: number,
    public value: number,
    public currency: string,
    public result: number,
  ) {}

  getResultColor(): string {
    if (this.result > 0) {
      return "green";
    } else if (this.result < 0) {
      return "red";
    }
    return "black";
  }
}

export enum AssetTransactionType {
  BUY = "buy",
  SELL = "sell",
}

export class AssetTransaction {
  constructor(
    public id: number,
    public isin: string,
    public quantity: number,
    public price: number,
    public type: AssetTransactionType,
    public date: Date,
  ) {}

  getName(): string {
    switch (this.type) {
      case AssetTransactionType.BUY:
        return "Buy";
      case AssetTransactionType.SELL:
        return "Sell";
      default:
        return exhaustiveGuard(this.type);
    }
  }

  getSign(): string {
    switch (this.type) {
      case AssetTransactionType.BUY:
        return "+";
      case AssetTransactionType.SELL:
        return "-";
      default:
        return exhaustiveGuard(this.type);
    }
  }

  getColor(): string {
    switch (this.type) {
      case AssetTransactionType.BUY:
        return "green";
      case AssetTransactionType.SELL:
        return "red";
      default:
        return exhaustiveGuard(this.type);
    }
  }
}
