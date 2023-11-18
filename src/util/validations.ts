export function isValidNumber(input: number | null): boolean {
  if (input === null) {
    return false;
  }

  return !(isNaN(input) || !isFinite(input) || input < 0);
}

export function isValidCurrency(input: string): boolean {
  return input.trim().length > 0;
}

export const moneyPattern = /^(?!0*[.,]0*$|[.,]0*$|0*$)\d+[,.]?\d{0,2}$/;
