import {
  Account,
  AccountHistory,
  AccountPreferences,
  AccountTransaction,
  AccountTransactionType,
  Asset,
  AssetType,
  Exchange,
} from "../types.ts";
import dayjs, { Dayjs } from "dayjs";

type ErrorResponse = {
  error?: string;
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

type AccountBalanceDto = {
  amount: number;
  currency: string;
};

const fromAccountBalanceDto = (accountBalance: AccountBalanceDto) => {
  return {
    amount: accountBalance.amount,
    currency: accountBalance.currency,
  };
};

type AccountDto = {
  id: number;
  name: string;
  balances: AccountBalanceDto[];
  value: number;
  preferences: AccountPreferencesDto;
  xirr: number;
};

const fromAccountDto = (account: AccountDto): Account => {
  return new Account(
    account.id,
    account.name,
    account.balances.map(fromAccountBalanceDto),
    account.value,
    fromAccountPreferencesDto(account.preferences),
    account.xirr,
  );
};

type AccountTransactionDto = {
  id: number;
  type: AccountTransactionType;
  amount: number;
  currency: string;
  date: string;
};

const fromAccountTransactionDto = (
  transaction: AccountTransactionDto,
): AccountTransaction => {
  return new AccountTransaction(
    transaction.id,
    transaction.type,
    transaction.amount,
    transaction.currency,
    new Date(transaction.date),
  );
};

type AssetDto = {
  asset_id: number;
  name: string;
  ticker: string;
  exchange_code: string;
  quantity: number;
  price: number;
  currency: string;
  result: number;
  type: AssetType;
};

const fromAssetDto = (stock: AssetDto): Asset => {
  return new Asset(
    stock.asset_id,
    stock.name,
    stock.ticker,
    stock.exchange_code,
    stock.quantity,
    stock.price,
    stock.currency,
    stock.result,
    stock.type,
  );
};

type AccountHistoryDto = {
  date: string;
  amount: number;
};

const fromAccountHistoryDto = (
  accountHistory: AccountHistoryDto,
): AccountHistory => {
  return {
    date: dayjs(accountHistory.date),
    amount: accountHistory.amount,
  };
};

type ExchangeDto = {
  id: number;
  name: string;
  code: string;
};

const fromExchangeDto = (exchange: ExchangeDto): Exchange => {
  return {
    id: exchange.id,
    name: exchange.name,
    code: exchange.code,
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
    const accountDto: AccountDto = await response.json();
    return fromAccountDto(accountDto);
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
    const data: AccountTransactionDto[] = await response.json();
    return data.map(fromAccountTransactionDto);
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

  async updateAccountTransaction(
    id: number,
    transactionId: number,
    type: AccountTransactionType,
    amount: number,
    currency: string,
    date: Dayjs,
  ) {
    const response = await fetch(
      `${this.apiUrl}/api/accounts/${id}/transactions/${transactionId}`,
      {
        method: "PUT",
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
      throw new Error(data.error ?? "Failed to modify transaction");
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

  async fetchAssets(accountId: number): Promise<Asset[]> {
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

  async buyStocks(
    accountId: number,
    ticker: string,
    exchange: string,
    quantity: number,
    price: number,
    date: Dayjs,
    payCurrency: string | null,
    exchangeRate: number | null,
    commission: number | null,
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
          pay_currency: payCurrency,
          exchange_rate: exchangeRate,
          commission,
        }),
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to add stock");
    }
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

  async renameAccount(id: number, name: string): Promise<void> {
    const response = await fetch(`${this.apiUrl}/api/accounts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to rename account");
    }
  }

  async deleteAccount(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/api/accounts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to delete account");
    }
  }

  async fetchAccountHistory(id: number): Promise<AccountHistory[]> {
    const response = await fetch(`${this.apiUrl}/api/accounts/${id}/history`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch account history");
    }
    const accountHistoryDto: AccountHistoryDto[] = await response.json();
    return accountHistoryDto.map(fromAccountHistoryDto);
  }

  async fetchExchanges(): Promise<Exchange[]> {
    const response = await fetch(`${this.apiUrl}/api/exchanges`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch exchanges");
    }
    const exchangesDto: ExchangeDto[] = await response.json();
    return exchangesDto.map(fromExchangeDto);
  }

  async sendCsvFile(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      resolve(file);
    });
  }

  async sendBrokerFile(file: File, broker: string) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `${this.apiUrl}/api/import_stock_transactions?broker=${broker}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to send broker file");
    }
    return await response.blob();
  }
}
