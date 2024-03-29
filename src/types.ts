import { exhaustiveGuard } from "./util/exhaustive-switch.ts";
import { Dayjs } from "dayjs";
import { displayCurrency } from "./util/display-currency.ts";

export class Account {
  constructor(
    public id: number,
    public name: string,
    public balances: AccountBalance[],
    public value: number,
    public preferences: AccountPreferences,
    public xirr: number,
  ) {}

  hasXirr(): boolean {
    return this.xirr !== null;
  }

  getXirrColor(): string {
    if (!this.hasXirr()) {
      return "black";
    }
    if (this.xirr > 0) {
      return "green";
    } else if (this.xirr < 0) {
      return "red";
    }
    return "black";
  }

  displayXirr(): string {
    if (!this.hasXirr()) {
      return "";
    }
    if (this.xirr > 0) {
      return "+" + (this.xirr * 100).toFixed(1) + "%";
    }
    return (this.xirr * 100).toFixed(1) + "%";
  }

  displayValue(): string {
    return displayCurrency(this.value, this.preferences.baseCurrency);
  }
}

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
  COST = "cost",
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
      case AccountTransactionType.COST:
        return "Cost";
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
      case AccountTransactionType.COST:
        return "-";
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
      case AccountTransactionType.COST:
        return "red";
      default:
        return exhaustiveGuard(this.type);
    }
  }

  isEditable() {
    switch (this.type) {
      case AccountTransactionType.DEPOSIT:
        return true;
      case AccountTransactionType.WITHDRAWAL:
        return true;
      case AccountTransactionType.BUY:
        return false;
      case AccountTransactionType.SELL:
        return false;
      case AccountTransactionType.DIVIDEND:
        return false;
      case AccountTransactionType.COST:
        return true;
      default:
        return exhaustiveGuard(this.type);
    }
  }
}

export type AccountPreferences = {
  baseCurrency: string;
};

export class Asset {
  constructor(
    public id: number,
    public name: string,
    public ticker: string,
    public exchange: string,
    public quantity: number,
    public price: number,
    public currency: string,
    public result: number,
    public type: AssetType,
  ) {}

  getResultColor(): string {
    if (this.result > 0) {
      return "green";
    } else if (this.result < 0) {
      return "red";
    }
    return "black";
  }

  displayResult(): string {
    if (this.result > 0) {
      return "+" + (this.result * 100).toFixed(1) + "%";
    }
    return (this.result * 100).toFixed(1) + "%";
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
    public assetId: number,
    public quantity: number,
    public price: number,
    public type: AssetTransactionType,
    public date: Date,
    public payCurrency: string | null,
    public exchangeRate: number | null,
    public commission: number | null,
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

  getQuantity() {
    if (this.type === AssetTransactionType.DIVIDEND) {
      return "-";
    }
    return this.quantity;
  }

  getPrice() {
    return this.price * (this.exchangeRate ?? 1);
  }

  getValue() {
    if (this.type === AssetTransactionType.DIVIDEND) {
      return this.price * (this.exchangeRate ?? 1);
    }
    return this.quantity * this.price * (this.exchangeRate ?? 1);
  }

  isDividend() {
    return this.type === AssetTransactionType.DIVIDEND;
  }
}

export type AssetBalanceHistory = {
  date: Dayjs;
  quantity: number;
  price: number;
  result: number;
};

export type AccountHistory = {
  date: Dayjs;
  amount: number;
};

export type BaseStockValue = {
  price: number;
  currency: string;
};

export type Exchange = {
  id: number;
  name: string;
  code: string;
};

export enum AssetType {
  STOCK = "STOCK",
  CRYPTO = "CRYPTO",
  DEPOSIT = "DEPOSIT",
  BOND = "BOND",
}
