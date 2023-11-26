import { exhaustiveGuard } from "./util/exhaustive-switch.ts";
import { Dayjs } from "dayjs";

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
  BUY = "buy",
  SELL = "sell",
  DIVIDEND = "dividend",
}

export class AccountTransaction {
  constructor(
    public id: number,
    public type: AccountTransactionType,
    public amount: number,
    public currency: string,
    public date: Date,
  ) {}

  getName() {
    switch (this.type) {
      case AccountTransactionType.DEPOSIT:
        return "Deposit";
      case AccountTransactionType.WITHDRAWAL:
        return "Withdrawal";
      case AccountTransactionType.BUY:
        return "Buy assets";
      case AccountTransactionType.SELL:
        return "Sell assets";
      case AccountTransactionType.DIVIDEND:
        return "Dividend";
      default:
        return exhaustiveGuard(this.type);
    }
  }

  getSign() {
    switch (this.type) {
      case AccountTransactionType.DEPOSIT:
        return "+";
      case AccountTransactionType.WITHDRAWAL:
        return "-";
      case AccountTransactionType.BUY:
        return "-";
      case AccountTransactionType.SELL:
        return "+";
      case AccountTransactionType.DIVIDEND:
        return "+";
      default:
        return exhaustiveGuard(this.type);
    }
  }

  getColor() {
    switch (this.type) {
      case AccountTransactionType.DEPOSIT:
        return "green";
      case AccountTransactionType.WITHDRAWAL:
        return "red";
      case AccountTransactionType.BUY:
        return "red";
      case AccountTransactionType.SELL:
        return "green";
      case AccountTransactionType.DIVIDEND:
        return "green";
      default:
        return exhaustiveGuard(this.type);
    }
  }
}

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
    public price: number,
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
  DIVIDEND = "dividend",
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
      case AssetTransactionType.DIVIDEND:
        return "Dividend";
      default:
        return exhaustiveGuard(this.type);
    }
  }

  getSign(): string {
    switch (this.type) {
      case AssetTransactionType.BUY:
        return "-";
      case AssetTransactionType.DIVIDEND:
        return "";
      case AssetTransactionType.SELL:
        return "+";
      default:
        return exhaustiveGuard(this.type);
    }
  }

  getColor(): string {
    switch (this.type) {
      case AssetTransactionType.BUY:
        return "red";
      case AssetTransactionType.DIVIDEND:
        return "black";
      case AssetTransactionType.SELL:
        return "green";
      default:
        return exhaustiveGuard(this.type);
    }
  }
}

export type AssetBalanceHistory = {
  date: Dayjs;
  quantity: number;
  price: number;
  result: number;
};

export type BaseStockValue = {
  price: number;
  currency: string;
};
