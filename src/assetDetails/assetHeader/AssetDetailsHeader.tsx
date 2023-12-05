import AssetExchangeOpen from './AssetExchangeOpen'
import { FiCopy } from 'react-icons/fi'
import { BsStar } from 'react-icons/bs'
import { Button } from '@mui/material'
import { IoMdAdd } from 'react-icons/io'
import React from 'react'
import { AddAssetDialog } from '../AddAssetDialog'
import { DialogType, useAddAsset } from '../use-add-asset'
import { AssetDetailsHeaderProps } from '../types'
import useFavouriteAssets from '../../favourites/favouriteAssets/use-favourite-assets'
import { NewFavouriteAsset } from '../../favourites/types'


const AssetDetailsHeader: React.FC<AssetDetailsHeaderProps> = ({ assetDetailsData }) => {
    const {
        accounts,
        isDialogOpen,
        openDialog,
        closeDialog,
        onConfirmStockDialog
    } = useAddAsset();

    const { addFavouriteAsset } = useFavouriteAssets();
    const newFavouriteAsset: NewFavouriteAsset = {
        code: assetDetailsData.Code,
        exchange: assetDetailsData.Exchange,
        name: assetDetailsData.Name,
        type: assetDetailsData.Type,
        country: assetDetailsData.Country,
        currency: assetDetailsData.Currency,
        isin: assetDetailsData.ISIN
    }


    return (
        <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg border">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center space-x-3">
                        <p className="text-3xl tracking-normal">{assetDetailsData.Name}</p>
                        <AssetExchangeOpen />
                    </div>
                    <div className="flex flex-row justify-items-start space-x-8 pt-1">
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <div>
                                <span className="font-bold tracking-normal">ISIN</span>
                                <span>: </span>
                                <span>{assetDetailsData.ISIN}</span>
                            </div>
                            <FiCopy />
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <div >
                                <span className="font-bold tracking-normal">Symbols</span>
                                <span>: </span>
                                <span>{assetDetailsData.Code}</span>
                            </div>

                            <FiCopy className="hover:bg-white transition duration-300 ease-in-out" />
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <div>
                                <span className="font-bold">Exchange: </span>
                                <span>{assetDetailsData.Exchange}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <Button className=" text-gray-900 bg-white">
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <BsStar />
                            <span className="hidden md:block" onClick={() => addFavouriteAsset(newFavouriteAsset)}>Watchlist</span>
                        </div>
                    </Button>
                    <Button className=" text-gray-900 bg-white" onClick={() => openDialog(DialogType.STOCK)}>
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <IoMdAdd />
                            <span className="hidden md:block">Add asset</span>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="border-t border-gray-300 mt-4"></div>

            <AddAssetDialog
                accounts={accounts}
                assetTicker={assetDetailsData.Code}
                exchange={assetDetailsData.Exchange}
                isOpen={isDialogOpen(DialogType.STOCK)}
                onClose={closeDialog}
                onConfirm={onConfirmStockDialog}
            />
        </div>
    )
}

export default AssetDetailsHeader