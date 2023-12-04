import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FavouriteAssetsService } from './favourite-assets-service';
import { FavouriteAsset, NewFavouriteAsset } from '../types';
import AuthContext from '../../auth/auth-context';
import { apiUrl } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../snackbar/use-snackbar';
import { Severity } from '../../snackbar/snackbar-context';


const useFavouriteAssets = () => {
    const [favouriteAssets, setFavouriteAssets] = useState<FavouriteAsset[]>([]);
    const [error, setError] = useState<string | null>(null);

    const alert = useSnackbar();

    const { token } = useContext(AuthContext);
    const favouriteAssetsService = useMemo(() => {
        return new FavouriteAssetsService(apiUrl, token);
    }, [token]);

    const navigate = useNavigate()

    const fetchFavouriteAssets = useCallback(async () => {
        try {
            const assets = await favouriteAssetsService.fetchFavouriteAssets();
            setFavouriteAssets(assets);
        } catch (error) {
            setError("Failed to fetch favorite assets.");
        }
    }, [favouriteAssetsService]);

    const addFavouriteAsset = async (newAsset: NewFavouriteAsset) => {
        try {
            await favouriteAssetsService.addFavouriteAsset(newAsset);
        } catch (error) {
            alert("Failed to add favorite asset", Severity.ERROR);
        }
        alert(`${newAsset.code} added to favourites`, Severity.SUCCESS)
    };

    const deleteFavouriteAsset = async (assetId: number) => {
        try {
            await favouriteAssetsService.deleteFavouriteAsset(assetId);
            await fetchFavouriteAssets();
        } catch (error) {
            alert("Failed to delete favorite asset", Severity.ERROR);
        }
        alert("Asset deleted", Severity.SUCCESS)
    };

    const viewFavouriteAsset = (assetCode: string, assetExchange: string) => {
        navigate(`/assets/${assetCode}.${assetExchange}`)
    }

    useEffect(() => {
        fetchFavouriteAssets();
    }, [fetchFavouriteAssets]); // Fetch favorite assets on component mount

    return {
        favouriteAssets,
        error,
        fetchFavouriteAssets,
        addFavouriteAsset,
        deleteFavouriteAsset,
        viewFavouriteAsset
    };
};

export default useFavouriteAssets;
