import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth/auth-context';
import { apiUrl } from '../../config';
import { Severity } from '../../snackbar/snackbar-context';
import { useSnackbar } from '../../snackbar/use-snackbar';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en'; // Import a locale if needed

dayjs.extend(utc);
dayjs.extend(timezone);

interface StockExchangeDto {
    id: number;
    name: string;
    mic: string;
    country: string;
    code: string;
    timezone: string;
    opening_hour: string;
    closing_hour: string;
}

export interface StockExchange {
    id: number;
    name: string;
    mic: string;
    country: string;
    code: string;
    timezone: string;
    openingHour: string;
    closingHour: string;
}

interface StockExchangesHook {
    stockExchanges: StockExchange[];
    itemsPerPage: number;
    currentPage: number;
    favorites: string[];
    showFavorites: boolean;
    handlePageChange: (newPage: number) => void;
    addToFavorites: (exchangeName: string) => void;
    isFavorite: (exchangeName: string) => boolean;
    toggleShowFavorites: () => void;
    filteredExchanges: StockExchange[];
    totalPages: number;
    startIndex: number;
    endIndex: number;
}

function mapStockExchangeDtoToModel(dto: StockExchangeDto): StockExchange {
    const openingHourDateTimeString = `2000-01-01 ${dto.opening_hour}`;
    const closingHourDateTimeString = `2000-01-01 ${dto.closing_hour}`;

    // Parse the opening and closing hours
    const openingHour = dayjs(openingHourDateTimeString).tz(dto.timezone).format('HH:mm:ss');
    const closingHour = dayjs(closingHourDateTimeString).tz(dto.timezone).format('HH:mm:ss');
    return {
        id: dto.id,
        name: dto.name,
        mic: dto.mic,
        country: dto.country,
        code: dto.code,
        timezone: dto.timezone,
        openingHour: openingHour,
        closingHour: closingHour,
    };
}

const useStockExchanges = (initialItemsPerPage = 10): StockExchangesHook => {
    const [stockExchanges, setStockExchanges] = useState<StockExchange[]>([]);
    const [itemsPerPage] = useState<number>(initialItemsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    const { token } = useContext(AuthContext);
    const alert = useSnackbar();
    
    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage);
    }, []);

    const addToFavorites = useCallback((exchangeName: string) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(exchangeName)
                ? prevFavorites.filter((name) => name !== exchangeName)
                : [...prevFavorites, exchangeName]
        );
    }, []);

    const isFavorite = useCallback((exchangeName: string) => {
        return favorites.includes(exchangeName);
    }, [favorites]);

    const toggleShowFavorites = useCallback(() => {
        setShowFavorites((prevShowFavorites) => !prevShowFavorites);
        setCurrentPage(0);
    }, []);

    const filteredExchanges = showFavorites
        ? stockExchanges.filter((exchange) => isFavorite(exchange.name))
        : stockExchanges;

    const totalPages: number = Math.ceil(filteredExchanges.length / itemsPerPage);
    const startIndex: number = currentPage * itemsPerPage;
    const endIndex: number = Math.min((currentPage + 1) * itemsPerPage, filteredExchanges.length);


    const fetchExchanges = useCallback(async () => {
        try{
            const response = await fetch(`${apiUrl}/api/exchanges`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch list of exchanges");
            }
    
            const result: StockExchangeDto[] = await response.json();
            setStockExchanges(result.map(mapStockExchangeDtoToModel));
            return result;
        } catch (error) {
            console.log((error as Error).message);
            alert("Failed to get exchanges", Severity.ERROR);
        }
        
    }, [alert, token])


    useEffect(() => {
        fetchExchanges();
    }, [fetchExchanges])

    return {
        stockExchanges,
        itemsPerPage,
        currentPage,
        favorites,
        showFavorites,
        handlePageChange,
        addToFavorites,
        isFavorite,
        toggleShowFavorites,
        filteredExchanges,
        totalPages,
        startIndex,
        endIndex,
    };
};

export default useStockExchanges;
