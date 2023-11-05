export abstract class Asset {
  abstract getResult(): number;

  abstract getKey(): string;

  getResultColor(): string {
    const result = this.getResult();
    if (result > 0) {
      return "green";
    } else if (result < 0) {
      return "red";
    }
    return "black";
  }
}

export class Stock extends Asset {
  constructor(
    public isin: string,
    public name: string,
    public ticker: string,
    public exchange: string,
    public quantity: number,
    public value: number,
    public currency: string,
    public result: number,
  ) {
    super();
  }

  getResult(): number {
    return this.result;
  }

  getKey(): string {
    return this.isin;
  }
}

export class Bond extends Asset {
  constructor(
    public isin: string,
    public result: number,
  ) {
    super();
  }

  getResult(): number {
    return this.result;
  }

  getKey(): string {
    return this.isin;
  }
}

export class Deposit extends Asset {
  constructor(
    public isin: string,
    public result: number,
  ) {
    super();
  }

  getResult(): number {
    return this.result;
  }

  getKey(): string {
    return this.isin;
  }
}

export class Cryptocurrency extends Asset {
  constructor(
    public isin: string,
    public result: number,
  ) {
    super();
  }

  getResult(): number {
    return this.result;
  }

  getKey(): string {
    return this.isin;
  }
}

export type AccountPreferences = {
  baseCurrency: string;
  taxCurrency: string;
};

export const DEFAULT_ACCOUNT_PREFERENCES: AccountPreferences = {
  baseCurrency: "PLN",
  taxCurrency: "PLN",
};
