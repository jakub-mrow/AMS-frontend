import AssetExchangeOpen from './AssetExchangeOpen'
import { FiCopy } from 'react-icons/fi'
import { BsStar } from 'react-icons/bs'
import { Button } from '@mui/material'
import AssetDetailFrontCards from './AssetDetailFrontCards'
import { IoMdAdd } from 'react-icons/io'
import { SymbolOverview } from 'react-tradingview-embed'

const AssetDetailsHeader = () => {
    return (
        <div className="flex flex-col m-6 p-4 bg-gray-100 rounded-lg shadow-lg border">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center space-x-3">
                        <p className="text-3xl tracking-normal">Vanguard S&P 500 UCITS ETF</p>
                        <AssetExchangeOpen />
                    </div>
                    <div className="flex flex-row justify-items-start space-x-8 pt-1">
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <div>
                                <span className="font-bold tracking-normal">ISIN</span>
                                <span>: </span>
                                <span>IE00B3XXRP09</span>
                            </div>
                            <FiCopy />
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <div >
                                <span className="font-bold tracking-normal">Symbols</span>
                                <span>: </span>
                                <span>VUSA, VUSD</span>
                            </div>

                            <FiCopy className="hover:bg-white transition duration-300 ease-in-out"/>
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
                    <Button className=" text-gray-900 bg-white">
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <IoMdAdd />
                            <span className="hidden md:block">Add asset</span>
                        </div>
                    </Button>
                </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="pb-4">
                <SymbolOverview widgetProps={{colorTheme: "light"}}/>
            </div>
            <AssetDetailFrontCards />
        </div>
    )
}

export default AssetDetailsHeader