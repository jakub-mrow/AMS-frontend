import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/auth-context";
import { apiUrl } from "../config";
import { useParams } from "react-router-dom";
import { Result } from "../appBar/use-search-bar";
import { AssetDetailsInfoRequest, AssetDetailsInfoResponse, AssetDetailsInfoResponseDto, convertResponseDtoToModel } from "./types";
import dayjs from 'dayjs';

export interface AssetDetailsDataProps {
    assetDetailsData: Result,
    assetDetailsInfo: AssetDetailsInfoResponse,
}

export const useAssetDetails = () => {
    const { token } = useContext(AuthContext);
    const [assetDetailsData, setAssetDetailsData] = useState<Result | null>(null);
    const [assetDetailsInfo, setAssetDetailsInfo] = useState<AssetDetailsInfoResponse | null>(null);
    const { assetCode } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [stock, exchange] = (assetCode || '').split('.')!;

    const getSearchResult = useCallback(async (): Promise<Result> => {
        const response = await fetch(`${apiUrl}/api/search/?query_string=${assetCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        const result: Result[] = await response.json();
        return result[0];
    }, [token, assetCode])

    const getAssetDetailsInfo = useCallback(async (requestParams: AssetDetailsInfoRequest): Promise<AssetDetailsInfoResponse> => {
        const { stock, exchange, period, from, to } = requestParams;
        const params = new URLSearchParams({
            stock: stock || '',
            exchange: exchange || '',
            period: period || '',
            from: from || '',
            to: to || '',
        });
        const queryString = params.toString();

        const response = await fetch(`${apiUrl}/api/get_stock_details?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        const responseData: AssetDetailsInfoResponseDto = await response.json()
        const nonDtoResponse: AssetDetailsInfoResponse = convertResponseDtoToModel(responseData);

        return nonDtoResponse;
    }, [token])


    useEffect(() => {
        const f = async () => {
            setIsLoading(true);
            const today = dayjs();
            const oneMonthAgo = today.subtract(1, 'month');

            const todayFormatted = today.format('YYYY-MM-DD');
            const oneMonthAgoFormatted = oneMonthAgo.format('YYYY-MM-DD');

            const assetDetailsInfoRequestData: AssetDetailsInfoRequest = {
                stock: stock,
                exchange: exchange,
                period: "d",
                from: oneMonthAgoFormatted,
                to: todayFormatted,
            }
            setAssetDetailsData(await getSearchResult());
            setAssetDetailsInfo(await getAssetDetailsInfo(assetDetailsInfoRequestData));
            setIsLoading(false);
        }

        f();
    }, [assetCode, exchange, getAssetDetailsInfo, getSearchResult, stock])


    return {
        assetDetailsData,
        assetDetailsInfo,
        getSearchResult,
        isLoading
    }
}