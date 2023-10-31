export type AccountPreferences = {
  baseCurrency: string;
  taxCurrency: string;
};

export const DEFAULT_ACCOUNT_PREFERENCES: AccountPreferences = {
  baseCurrency: "PLN",
  taxCurrency: "PLN",
};
