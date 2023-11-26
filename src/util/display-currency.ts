export const displayCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat([], {
    localeMatcher: "best fit",
    style: "currency",
    currency,
  }).format(value);
};

export const displayCurrencyWithKMB = (value: number, currency: string) => {
  return new Intl.NumberFormat([], {
    localeMatcher: "best fit",
    style: "currency",
    currency,
    notation: "compact",
  }).format(value);
};
