import { useCallback, useState } from 'react';

interface StockExchange {
    name: string;
    timezone: string;
    openingHours: string;
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

const useStockExchanges = (initialExchanges: StockExchange[], initialItemsPerPage = 5): StockExchangesHook => {
    const [stockExchanges] = useState<StockExchange[]>(initialExchanges);
    const [itemsPerPage] = useState<number>(initialItemsPerPage);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

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
    }, []);

    const filteredExchanges = showFavorites
        ? stockExchanges.filter((exchange) => isFavorite(exchange.name))
        : stockExchanges;

    const totalPages: number = Math.ceil(filteredExchanges.length / itemsPerPage);
    const startIndex: number = currentPage * itemsPerPage;
    const endIndex: number = Math.min((currentPage + 1) * itemsPerPage, filteredExchanges.length);

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
