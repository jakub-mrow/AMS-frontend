import { useCallback, useContext, useEffect, useState } from 'react'
import AuthContext from '../auth/auth-context';
import { apiUrl } from '../config';

export interface Result {
    Code: string;
    Exchange: string;
    Name: string;
    Type: string;
    Country: string;
    Currency: string;
    ISIN: string;
    previousClose: number;
    previousCloseDate: string;
}

const useSearchBar = () => {
    const { token } = useContext(AuthContext);
    const [searchResults, setSearchResults] = useState<Result[] | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    
    const getSearchResult = useCallback( async () => {
        const response = await fetch(`${apiUrl}/api/search/?query_string=${searchText}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        return await response.json();
    }, [searchText, token])

    
    useEffect(() => {
        const f = async () => {
            if (searchText !== ""){
                setSearchResults(await getSearchResult());
            } else {
                setSearchText("")
                setSearchResults(null);
            }
        }
        const timeoutId = setTimeout(() => {
            f();
        }, 200);

        return () => {
            clearTimeout(timeoutId)
        }
    }, [getSearchResult, searchText])


    return {
        searchResults,
        setSearchText
    }
}

export default useSearchBar;