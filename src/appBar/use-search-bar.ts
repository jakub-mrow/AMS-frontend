import { useCallback, useContext, useEffect, useState } from 'react'
import AuthContext from '../auth/auth-context';
import { apiUrl } from '../config';
import { AlertColor } from '@mui/material';

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
    const [searchResults, setSearchResults] = useState<Result[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [showAlert, setShowAlert] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");


    const updateAlertSeverity = useCallback((severity: AlertColor) => {
        setAlertSeverity(severity);
    }, [])

    const updateAlertText = useCallback((text: string | null) => {
        setShowAlert(text);
    }, [])

    const getSearchResult = useCallback(async () => {
        try {

            const response = await fetch(`${apiUrl}/api/search/?query_string=${searchText}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Could not load search results");
            }

            return await response.json();

        } catch (error) {
            setAlertSeverity('error');
            setShowAlert((error as Error).message);
        }
    }, [searchText, token, setAlertSeverity, setShowAlert])


    useEffect(() => {
        const f = async () => {
            if (searchText !== "") {
                setSearchResults(await getSearchResult());
            } else {
                setSearchText("")
                setSearchResults([]);
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
        setSearchText,
        updateAlertSeverity,
        updateAlertText,
        alertSeverity,
        showAlert
    }
}

export default useSearchBar;