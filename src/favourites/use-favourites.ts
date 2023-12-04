import useFavouriteAssets from "./favouriteAssets/use-favourite-assets"

export const useFavourites = () => {
    const { favouriteAssets, deleteFavouriteAsset, viewFavouriteAsset } = useFavouriteAssets();


    return {
        favouriteAssets,
        deleteFavouriteAsset,
        viewFavouriteAsset
    }
}