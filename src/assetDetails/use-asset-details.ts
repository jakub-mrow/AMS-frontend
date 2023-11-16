import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/auth-context";
import { apiUrl } from "../config";
import { useParams } from "react-router-dom";
import { Result } from "../appBar/use-search-bar";

export interface AssetDetailsDataProps {
    assetDetailsData: Result
}

export const useAssetDetails = () => {
    const { token } = useContext(AuthContext);
    const [assetDetailsData, setAssetDetailsData] = useState<Result | null>(null);
    const { assetCode } = useParams();

    const getSearchResult = useCallback( async (): Promise<Result> => {
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


    useEffect(() => {
        const f = async () => {
            setAssetDetailsData(await getSearchResult());
        }

        f();
    }, [assetCode, getSearchResult])


    return {
        assetDetailsData,
        getSearchResult
    }
}