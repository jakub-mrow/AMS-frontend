import dayjs, { Dayjs } from "dayjs";
import { Result } from "../appBar/use-search-bar";

export interface ExchangeInfo {
    id: number;
    name: string;
    mic: string;
    country: string;
    code: string;
    timezone: string;
    opening_hour: string;
    closing_hour: string;
}

export interface AssetPriceChangeDto {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjusted_close: number;
    volume: number;
}

export interface AssetPriceChange {
    date: Dayjs;
    open: number;
    high: number;
    low: number;
    close: number;
    adjusted_close: number;
    volume: number;
}

export interface AssetDetailsInfoResponseDto {
    price_changes: AssetPriceChangeDto[];
    exchange_info: ExchangeInfo;
    current_price: number;
    previous_close: number;
    percentage_change_previous_close: number;
}


export interface AssetDetailsInfoResponse {
    price_changes: AssetPriceChange[];
    exchange_info: ExchangeInfo;
    current_price: number;
    previous_close: number;
    percentage_change_previous_close: number;
}

// Function to convert AssetPriceChangeDto to AssetPriceChange
export const convertPriceChangeDtoToModel = (dto: AssetPriceChangeDto): AssetPriceChange => ({
    date: dayjs(dto.date),
    open: dto.open,
    high: dto.high,
    low: dto.low,
    close: dto.close,
    adjusted_close: dto.adjusted_close,
    volume: dto.volume,
});

// Function to convert AssetDetailsInfoResponseDto to AssetDetailsInfoResponse
export const convertResponseDtoToModel = (dto: AssetDetailsInfoResponseDto): AssetDetailsInfoResponse => ({
    price_changes: dto.price_changes.map(convertPriceChangeDtoToModel),
    exchange_info: dto.exchange_info,
    current_price: dto.current_price,
    previous_close: dto.previous_close,
    percentage_change_previous_close: dto.percentage_change_previous_close,
});

export interface AssetDetailsInfoRequest {
    stock: string,
    exchange: string,
    period?: string,
    from: string,
    to: string,
}

export interface AssetDetailsHeaderProps {
    assetDetailsData: Result
    assetDetailsInfo: AssetDetailsInfoResponse
}