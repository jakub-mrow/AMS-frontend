export class Asset {
  constructor(
    public isin: string,
    public name: string,
    public ticker: string,
    public exchange: string,
    public quantity: number,
    public value: number,
    public currency: string,
    public result: number,
  ) {}

  getResultColor(): string {
    if (this.result > 0) {
      return "green";
    } else if (this.result < 0) {
      return "red";
    }
    return "black";
  }
}
