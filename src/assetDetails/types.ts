import dayjs, { Dayjs } from "dayjs";
import { Result } from "../appBar/use-search-bar";

export interface ExchangeInfo {
    id: number;
    name: string;
    mic: string;
    country: string;
    code: string;
    timezone: string;
    openingHour: string;
    closingHour: string;
}

export interface ExchangeInfoDto {
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
    adjustedClose: number;
    volume: number;
}

export interface AssetDetailsInfoResponseDto {
    price_changes: AssetPriceChangeDto[];
    exchange_info: ExchangeInfoDto;
    current_price: number;
    previous_close: number;
    percentage_change_previous_close: number;
}


export interface AssetDetailsInfoResponse {
    priceChanges: AssetPriceChange[];
    exchangeInfo: ExchangeInfo;
    currentPrice: number;
    previousClose: number;
    percentageChangePreviousClose: number;
}

// Function to convert AssetPriceChangeDto to AssetPriceChange
export const convertPriceChangeDtoToModel = (dto: AssetPriceChangeDto): AssetPriceChange => ({
    date: dayjs(dto.date),
    open: dto.open,
    high: dto.high,
    low: dto.low,
    close: dto.close,
    adjustedClose: dto.adjusted_close,
    volume: dto.volume,
});

// Function to convert AssetDetailsInfoResponseDto to AssetDetailsInfoResponse
export const convertResponseDtoToModel = (dto: AssetDetailsInfoResponseDto): AssetDetailsInfoResponse => ({
    priceChanges: dto.price_changes.map(convertPriceChangeDtoToModel),
    exchangeInfo: {
        id: dto.exchange_info.id,
        name: dto.exchange_info.name,
        mic: dto.exchange_info.mic,
        country: dto.exchange_info.country,
        code: dto.exchange_info.code,
        timezone: dto.exchange_info.timezone,
        openingHour: dto.exchange_info.opening_hour,
        closingHour: dto.exchange_info.closing_hour,
    },
    currentPrice: dto.current_price,
    previousClose: dto.previous_close,
    percentageChangePreviousClose: dto.percentage_change_previous_close,
});

export interface AssetDetailsInfoRequest {
    stock: string,
    exchange: string,
    period?: string,
    from: string,
    to: string,
}

export interface AssetHistoryPricesRequest {
    stock: string,
    exchange: string
}

export interface AssetDetailsHeaderProps {
    assetDetailsData: Result
    assetDetailsInfo: AssetDetailsInfoResponse
}

export interface AssetHistoryPrices {
    today: string;
    week: number;
    month: number;
    three_months: number;
    six_months: number;
    year: number;
    three_years: number;
    five_years: number;
    all_time: number;
}