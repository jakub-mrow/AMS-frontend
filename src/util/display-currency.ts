import { getUserLocale } from "./locale.ts";

export const displayCurrency = (value: number, currency: string) => {
  const userLocale = getUserLocale();
  return new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency,
  }).format(value);
};

export const displayCurrencyWithKMB = (value: number, currency: string) => {
  const userLocale = getUserLocale();
  return new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency,
    notation: "compact",
  }).format(value);
};
