export enum AssetTypes {
  STOCKS,
  BONDS,
  DEPOSITS,
  CRYPTO,
}

export type Asset = {
  isin: string;
  name: string;
  quantity: number;
  total: number;
  currency: string;
  result: number;
  exchange: string;
  type: AssetTypes;
};

export const assets: Asset[] = [
  {
    isin: "US0378331005",
    name: "Apple",
    quantity: 10,
    total: 132.05,
    currency: "USD",
    result: 0.05,
    exchange: "NASDAQ",
    type: AssetTypes.STOCKS,
  },
  {
    isin: "US88160R1014",
    name: "Tesla",
    quantity: 10,
    total: 662.16,
    currency: "USD",
    result: -0.16,
    exchange: "NASDAQ",
    type: AssetTypes.STOCKS,
  },
  {
    isin: "US0231351067",
    name: "Amazon",
    quantity: 10,
    total: 3222.9,
    currency: "USD",
    result: 0.9,
    exchange: "NASDAQ",
    type: AssetTypes.STOCKS,
  },
  {
    isin: "US5946181045",
    name: "Orlen",
    quantity: 10,
    total: 66.05,
    currency: "PLN",
    result: 0,
    exchange: "WSE",
    type: AssetTypes.STOCKS,
  },
  {
    isin: "BTC",
    name: "Bitcoin",
    quantity: 10,
    total: 132.05,
    currency: "USD",
    result: 0.05,
    exchange: "Coinbase",
    type: AssetTypes.CRYPTO,
  },
  {
    isin: "ETH",
    name: "Ethereum",
    quantity: 10,
    total: 662.16,
    currency: "USD",
    result: 0.16,
    exchange: "Coinbase",
    type: AssetTypes.CRYPTO,
  },
];
