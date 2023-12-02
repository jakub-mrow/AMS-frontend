import AssetExchangeOpen from './AssetExchangeOpen'
import { FiCopy } from 'react-icons/fi'
import { BsStar } from 'react-icons/bs'
import { Button } from '@mui/material'
import AssetDetailFrontCards from './AssetDetailFrontCards'
import { IoMdAdd } from 'react-icons/io'
import React from 'react'
import { AddAssetDialog } from '../AddAssetDialog'
import { DialogType, useAddAsset } from '../use-add-asset'
import { ChartTabs } from './ChartTabs'
import { AssetDetailsHeaderProps } from '../types'


const AssetDetailsHeader: React.FC<AssetDetailsHeaderProps> = ({ assetDetailsData, assetDetailsInfo }) => {
    let symbols: string[] = [];
    switch (assetDetailsData.Type) {
        case 'Common Stock':
            if (assetDetailsData.Exchange === "US") {
                symbols = [`NASDAQ:${assetDetailsData.Code}`];
            } else {
                symbols = [`${assetDetailsData.Exchange}:${assetDetailsData.Code}`];
            }
            break;
        case 'ETF':
            symbols = [`${assetDetailsData.Exchange}:${assetDetailsData.Code}`]
            break;
        case 'Currency':
            if (assetDetailsData.Exchange === "CC") {
                symbols = [`${assetDetailsData.Code.split("-").join("")}`];
                break;
            } else {
                symbols = [];
            }
            break;
        default:
            symbols = [`${assetDetailsData.Code}`]
            break;
    }

    const {
        accounts,
        isDialogOpen,
        openDialog,
        closeDialog,
        onConfirmStockDialog 
    } = useAddAsset();


    return (
        <div className="flex flex-col m-6 p-4 bg-gray-100 rounded-lg shadow-lg border">
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
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <Button className=" text-gray-900 bg-white">
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <BsStar />
                            <span className="hidden md:block">Watchlist</span>
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
            <div className="border-t border-gray-300 my-4"></div>

            <ChartTabs tradingviewSymbols={symbols} assetDetailsInfo={assetDetailsInfo} assetDetailsData={assetDetailsData}/>
            <AssetDetailFrontCards assetDetailsData={assetDetailsData} assetDetailsInfo={assetDetailsInfo}/>

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