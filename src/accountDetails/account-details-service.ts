import {
  Account,
  AccountPreferences,
  AccountTransaction,
  AccountTransactionType,
  Asset,
} from "../types.ts";
import { Dayjs } from "dayjs";

export type AccountInput = {
  name: string;
};

type ErrorResponse = {
  error?: string;
};

type AccountTransactionApi = {
  id: number;
  type: AccountTransactionType;
  amount: number;
  currency: string;
  date: string;
};

type AssetDto = {
  isin: string;
  name: string;
  ticker: string;
  exchange_code: string;
  quantity: number;
  value: number;
  currency: string;
  result: number;
};

const fromAssetDto = (stock: AssetDto): Asset => {
  return new Asset(
    stock.isin,
    stock.name,
    stock.ticker,
    stock.exchange_code,
    stock.quantity,
    stock.value,
    stock.currency,
    stock.result,
  );
};

type AccountPreferencesDto = {
  base_currency: string;
  tax_currency: string;
};

const fromAccountPreferencesDto = (
  accountPreference: AccountPreferencesDto,
): AccountPreferences => {
  return {
    baseCurrency: accountPreference.base_currency,
    taxCurrency: accountPreference.tax_currency,
  };
};

export class AccountsDetailsService {
  constructor(
    private readonly apiUrl: string,
    private readonly token: string,
  ) {}

  async fetchAccount(id: number): Promise<Account> {
    const response = await fetch(`${this.apiUrl}/api/accounts/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch account");
    }
    return await response.json();
  }

  async fetchAccountTransactions(id: number): Promise<AccountTransaction[]> {
    const response = await fetch(
      `${this.apiUrl}/api/accounts/${id}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch transactions");
    }
    const data: AccountTransactionApi[] = await response.json();
    return data.map((transaction) => ({
      ...transaction,
      date: new Date(transaction.date),
    }));
  }

  async addAccountTransaction(
    id: number,
    type: AccountTransactionType,
    amount: number,
    currency: string,
    date: Dayjs,
  ) {
    const response = await fetch(
      `${this.apiUrl}/api/accounts/${id}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          type,
          date,
        }),
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to add transaction");
    }
  }

  async deleteAccountTransaction(id: number, transactionId: number) {
    const response = await fetch(
      `${this.apiUrl}/api/accounts/${id}/transactions/${transactionId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }
  }

  async fetchStocks(accountId: number): Promise<Asset[]> {
    const response = await fetch(
      `${this.apiUrl}/api/stock_balances/${accountId}/list_dto`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch stocks");
    }
    const stocks: AssetDto[] = await response.json();
    return stocks.map(fromAssetDto);
  }

  async fetchBonds(_accountId: number): Promise<Asset[]> {
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  async fetchDeposits(_accountId: number): Promise<Asset[]> {
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  async fetchCryptocurrencies(_accountId: number): Promise<Asset[]> {
    return new Promise((resolve) => {
      resolve([]);
    });
  }

  async buyStocks(
    accountId: number,
    ticker: string,
    exchange: string,
    quantity: number,
    price: number,
    date: Dayjs,
  ) {
    const response = await fetch(
      `${this.apiUrl}/api/stock/${accountId}/transaction/buy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          ticker,
          exchange_code: exchange,
          quantity,
          price,
          date,
        }),
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to add stock");
    }
  }

  async fetchAccountPreferences(id: number): Promise<AccountPreferences> {
    const response = await fetch(
      `${this.apiUrl}/api/accounts/${id}/get_preferences`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch account preferences");
    }
    const accountPreferencesDto: AccountPreferencesDto = await response.json();
    return fromAccountPreferencesDto(accountPreferencesDto);
  }

  async updateAccountPreferences(
    id: number,
    accountPreferences: AccountPreferences,
  ) {
    const response = await fetch(
      `${this.apiUrl}/api/accounts/${id}/set_preferences`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          base_currency: accountPreferences.baseCurrency,
          tax_currency: accountPreferences.taxCurrency,
        }),
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to update account preferences");
    }
  }
}
