import { AccountTransaction, AccountTransactionType, Asset } from "../types.ts";
import { Dayjs } from "dayjs";

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
}
