export interface FavouriteAsset {
    id: number;
    code: string;
    exchange: string;
    name: string;
    type: string;
    country: string;
    currency: string;
    isin: string;
}

export interface NewFavouriteAsset {
    code: string;
    exchange: string;
    name: string;
    type: string;
    country: string;
    currency: string;
    isin: string;
}