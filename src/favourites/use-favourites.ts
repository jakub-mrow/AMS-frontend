import useStockExchanges from "./exchanges/use-stock-exchanges";
import useFavouriteAssets from "./favouriteAssets/use-favourite-assets"

export const useFavourites = () => {
    const { favouriteAssets, deleteFavouriteAsset, viewFavouriteAsset } = useFavouriteAssets();

    const {
        currentPage,
        showFavorites,
        handlePageChange,
        addToFavorites,
        isFavorite,
        toggleShowFavorites,
        filteredExchanges,
        totalPages,
        startIndex,
        endIndex,
    } = useStockExchanges();

    return {
        favouriteAssets,
        deleteFavouriteAsset,
        viewFavouriteAsset,
        currentPage,
        showFavorites,
        handlePageChange,
        addToFavorites,
        isFavorite,
        toggleShowFavorites,
        filteredExchanges,
        totalPages,
        startIndex,
        endIndex,
    }
}