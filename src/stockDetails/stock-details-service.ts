import {
  Asset,
  AssetBalanceHistory,
  AssetTransaction,
  AssetTransactionType,
  AssetType,
  BaseStockValue,
} from "../types.ts";
import dayjs, { Dayjs } from "dayjs";

type ErrorResponse = {
  error?: string;
};

type AssetTransactionDto = {
  id: number;
  asset_id: number;
  quantity: number;
  price: number;
  transaction_type: AssetTransactionType;
  date: string;
  pay_currency: string | null;
  exchange_rate: number | null;
  commission: number | null;
};

const fromAssetTransactionDto = (
  transaction: AssetTransactionDto,
): AssetTransaction =>
  new AssetTransaction(
    transaction.id,
    transaction.asset_id,
    transaction.quantity,
    transaction.price,
    transaction.transaction_type,
    new Date(transaction.date),
    transaction.pay_currency,
    transaction.exchange_rate,
    transaction.commission,
  );

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

type AssetBalanceHistoryDto = {
  quantity: number;
  price: number;
  date: string;
  result: number;
};

const fromAssetBalanceHistoryDto = (
  history: AssetBalanceHistoryDto,
): AssetBalanceHistory => {
  return {
    date: dayjs(history.date),
    quantity: history.quantity,
    price: history.price,
    result: history.result,
  };
};

type BaseStockValueDto = {
  price: number;
  currency: string;
};

const fromBaseStockValueDto = (
  baseStockValue: BaseStockValueDto,
): BaseStockValue => {
  return {
    price: baseStockValue.price,
    currency: baseStockValue.currency,
  };
};

export class StockDetailsService {
  constructor(
    private readonly apiUrl: string,
    private readonly token: string,
  ) {}

  async fetchStockBalance(accountId: number, id: number): Promise<Asset> {
    const response = await fetch(
      `${this.apiUrl}/api/stock_balances/${accountId}/${id}/dto`,
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
    id: number,
  ): Promise<AssetTransaction[]> {
    const response = await fetch(
      `${this.apiUrl}/api/stock/${accountId}/transaction?` +
        new URLSearchParams({
          id: id.toString(),
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

  async addAssetTransaction(
    accountId: number,
    assetId: number,
    quantity: number,
    price: number,
    transactionType: AssetTransactionType,
    date: Dayjs,
    payCurrency: string | null,
    exchangeRate: number | null,
    commission: number | null,
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
          asset_id: assetId,
          quantity,
          price,
          transaction_type: transactionType,
          date,
          pay_currency: payCurrency,
          exchange_rate: exchangeRate,
          commission,
        }),
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to add transaction");
    }
  }

  async updateAssetTransaction(
    accountId: number,
    transactionId: number,
    assetId: number,
    quantity: number,
    price: number,
    transactionType: AssetTransactionType,
    date: Dayjs,
    payCurrency: string | null,
    exchangeRate: number | null,
    commission: number | null,
  ) {
    const response = await fetch(
      `${this.apiUrl}/api/stock/${accountId}/transaction/${transactionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          asset_id: assetId,
          quantity,
          price,
          transaction_type: transactionType,
          date,
          pay_currency: payCurrency,
          exchange_rate: exchangeRate,
          commission,
        }),
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to update transaction");
    }
  }

  async deleteAssetTransaction(accountId: number, transactionId: number) {
    const response = await fetch(
      `${this.apiUrl}/api/stock/${accountId}/transaction/${transactionId}`,
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

  async fetchStockBalanceHistory(
    accountId: number,
    id: number,
  ): Promise<AssetBalanceHistory[]> {
    const response = await fetch(
      `${this.apiUrl}/api/stock_balances/${accountId}/${id}/history`,
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

  async fetchBaseStockValue(
    accountId: number,
    id: number,
  ): Promise<BaseStockValue> {
    const response = await fetch(
      `${this.apiUrl}/api/stock_balances/${accountId}/${id}/price`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(
        data.error ?? "Failed to fetch stock value in base currency",
      );
    }
    const data: BaseStockValueDto = await response.json();
    return fromBaseStockValueDto(data);
  }
}
