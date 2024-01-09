import { Account, AccountPreferences } from "../types.ts";

type ErrorResponse = {
  error?: string;
};

export type AccountInput = {
  name: string;
};

type AccountPreferencesDto = {
  base_currency: string;
};

const fromAccountPreferencesDto = (
  accountPreference: AccountPreferencesDto,
): AccountPreferences => {
  return {
    baseCurrency: accountPreference.base_currency,
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
    if (!response.ok) {
      const data: ErrorResponse = await response.json();
      throw new Error(data.error ?? "Failed to fetch accounts");
    }
    const accountsDto: AccountDto[] = await response.json();
    return accountsDto.map(fromAccountDto);
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
