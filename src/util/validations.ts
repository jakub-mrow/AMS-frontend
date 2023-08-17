export function isValidAmount(input: string): boolean {
  const numValue = parseFloat(input);

  if (isNaN(numValue) || !isFinite(numValue) || numValue < 0) {
    return false;
  }

  const decimalPart = input.split(".")[1];
  return !decimalPart || decimalPart.length <= 2;
}

export function isValidCurrency(input: string): boolean {
  return input.trim().length > 0;
}
