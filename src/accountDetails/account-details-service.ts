import { Account, AccountTransaction } from "../accounts/types.ts";

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
}
