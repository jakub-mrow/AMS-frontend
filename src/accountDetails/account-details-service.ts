import { Account } from "../accounts/types.ts";

export type AccountInput = {
  name: string;
};

type ErrorResponse = {
  error?: string;
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
}
