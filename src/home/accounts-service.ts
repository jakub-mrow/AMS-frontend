import { Account } from "../types.ts";

export type AccountInput = {
  name: string;
};

export class AccountsService {
  constructor(
    private readonly apiUrl: string,
    private readonly token: string,
  ) {}

  async fetchAccounts(): Promise<Account[]> {
    const response = await fetch(`${this.apiUrl}/api/accounts`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  }

  async postAccount(account: AccountInput): Promise<void> {
    const response = await fetch(`${this.apiUrl}/api/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ ...account }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
  }
}
