export const displayCurrency = (value: number, currency: string) => {
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  return new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency,
  }).format(value);
};
