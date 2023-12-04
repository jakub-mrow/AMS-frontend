import { FavouriteAsset } from "../types";
import { FcBarChart } from "react-icons/fc";

interface FavouriteAssetsProps {
    favouriteAssets: FavouriteAsset[];
    deleteFavoriteAsset: (id: number) => void;
    viewFavoriteAsset: (assetCode: string, assetExchange: string) => void;
}

const FavouriteAssets: React.FC<FavouriteAssetsProps> = ({ favouriteAssets, deleteFavoriteAsset, viewFavoriteAsset }) => {
    return (
        <div className="container">
            <div className="flex flex-row space-x-2">
                <FcBarChart className="text-4xl" />
                <h1 className="text-2xl font-bold mb-4">Favourite assets</h1>
            </div>
            {favouriteAssets.length > 0 ? (
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="focus:outline-none h-16 border border-gray-200">
                            <th className="px-6 py-3 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
                                Code
                            </th>
                            <th className="px-6 py-3 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
                                ISIN
                            </th>
                            <th className="px-6 py-3 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
                                Exchange
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {favouriteAssets.map((favouriteAsset) => (
                            <tr className="focus:outline-none h-16 border border-gray-200 rounded" key={favouriteAsset.id}>
                                <td className="">
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{favouriteAsset.name}</p>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{favouriteAsset.code}</p>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{favouriteAsset.isin}</p>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex items-center pl-5">
                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">{favouriteAsset.exchange}</p>
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex space-x-2 items-center justify-end pr-5">
                                        <button
                                            className="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                            onClick={() => viewFavoriteAsset(favouriteAsset.code, favouriteAsset.exchange)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="py-3 px-3 text-sm leading-none text-red-700 bg-red-100 rounded focus:outline-none"
                                            onClick={() => deleteFavoriteAsset(favouriteAsset.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="flex items-center justify-center bg-gray-100 p-8 rounded-xl">
                    <p className="text-gray-500">You don't have any assets watchlisted</p>
                </div>
            )}
        </div>
    );
}

export default FavouriteAssets;
