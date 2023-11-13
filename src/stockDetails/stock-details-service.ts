import {
  Asset,
  AssetBalanceHistory,
  AssetTransaction,
  AssetTransactionType,
} from "../types.ts";
import dayjs, { Dayjs } from "dayjs";

type ErrorResponse = {
  error?: string;
};

type AssetTransactionDto = {
  id: number;
  isin: string;
  quantity: number;
  price: number;
  transaction_type: AssetTransactionType;
  date: string;
};

const fromAssetTransactionDto = (
  transaction: AssetTransactionDto,
): AssetTransaction =>
  new AssetTransaction(
    transaction.id,
    transaction.isin,
    transaction.quantity,
    transaction.price,
    transaction.transaction_type,
    new Date(transaction.date),
  );

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

type AssetBalanceHistoryDto = {
  isin: string;
  quantity: number;
  value: number;
  date: string;
  result: number;
};

const fromAssetBalanceHistoryDto = (
  history: AssetBalanceHistoryDto,
): AssetBalanceHistory => {
  return {
    date: dayjs(history.date),
    quantity: history.quantity,
    value: history.value,
    result: history.result,
  };
};

export class StockDetailsService {
  constructor(
    private readonly apiUrl: string,
    private readonly token: string,
  ) {}

  async fetchStockBalance(accountId: number, isin: string): Promise<Asset> {
    const response = await fetch(
      `${this.apiUrl}/api/stock_balances/${accountId}/${isin}/dto`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch stock balance");
    }
    const data: AssetDto = await response.json();
    return fromAssetDto(data);
  }

  async fetchAssetTransactions(
    accountId: number,
    isin: string,
  ): Promise<AssetTransaction[]> {
    const response = await fetch(
      `${this.apiUrl}/api/stock/${accountId}/transaction?` +
        new URLSearchParams({
          isin,
        }),
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
    const data: AssetTransactionDto[] = await response.json();
    return data.map(fromAssetTransactionDto);
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

  async addAssetTransaction(
    accountId: number,
    isin: string,
    quantity: number,
    price: number,
    transactionType: AssetTransactionType,
    date: Dayjs,
  ) {
    const response = await fetch(
      `${this.apiUrl}/api/stock/${accountId}/transaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          isin,
          quantity,
          price,
          transaction_type: transactionType,
          date,
        }),
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to add transaction");
    }
  }

  async fetchStockBalanceHistory(
    accountId: number,
    isin: string,
  ): Promise<AssetBalanceHistory[]> {
    const response = await fetch(
      `${this.apiUrl}/api/stock_balances/${accountId}/${isin}/history`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch stock balance history");
    }
    const data: AssetBalanceHistoryDto[] = await response.json();
    return data.map(fromAssetBalanceHistoryDto);
  }
}
