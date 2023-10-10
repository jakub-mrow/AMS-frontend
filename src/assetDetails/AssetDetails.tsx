import TradingViewWidget from './TradingViewWidget'
import AssetDetailsCardTitle from './AssetDetailsCardTitle'
import AssetDetailFrontCards from './AssetDetailFrontCards'
import { Button } from '@mui/material'
import { BsStar } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import AssetOverviewHeader from './AssetOverviewHeader'
import AssetDetailsPriceValues from './AssetDetailsPriceValues'
import { FiCopy } from 'react-icons/fi';
import AssetExchangeOpen from './AssetExchangeOpen'
import AssetOverviewBody from './AssetOverviewBody'


const AssetDetails = () => {
    return (
        <div className="flex flex-col m-6 space-y-4">
            <div className="flex flex-col m-6 p-4 bg-gray-100 rounded-lg shadow-lg border">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center space-x-3">
                            <p className="text-3xl tracking-normal">Vanguard S&P 500 UCITS ETF</p>
                            <AssetExchangeOpen/>
                        </div>
                        <div className="flex flex-row justify-items-start space-x-8 pt-1">
                            <div className="flex flex-row justify-center items-center space-x-2">
                                <div>
                                    <span className="font-bold tracking-normal">ISIN</span>
                                    <span>: </span>
                                    <span>IE00B3XXRP09</span>
                                </div>
                                <FiCopy/>
                            </div>
                            <div className="flex flex-row justify-center items-center space-x-2">
                                <div >
                                    <span className="font-bold tracking-normal">Symbols</span>
                                    <span>: </span>
                                    <span>VUSA, VUSD</span>
                                </div>

                                <FiCopy/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center space-x-2">
                        <Button className=" text-gray-900 bg-white">
                            <div className="flex flex-row justify-center items-center space-x-2">
                                <BsStar/>
                                <span className="hidden md:block">Watchlist</span>
                            </div>
                        </Button>
                        <Button className=" text-gray-900 bg-white">
                            <div className="flex flex-row justify-center items-center space-x-2">
                                <IoMdAdd/>
                                <span className="hidden md:block">Add asset</span>
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <AssetDetailFrontCards/>
            </div>
            <div className="flex flex-col m-6 p-4 bg-gray-100 rounded-lg shadow-lg border">
                <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-2 md:space-y-0">
                    <div className="flex-1 space-y-4">
                        <div className="bg-white rounded-lg shadow-lg">
                            <AssetDetailsCardTitle cardTitle="Overview"/>
                            <AssetOverviewHeader/>
                            <AssetDetailsPriceValues/>
                            <AssetOverviewBody/>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg">
                            <AssetDetailsCardTitle cardTitle="Description"/>
                            <p className="p-4">
                                The S&P 500 Index tracks the 500® largest U.S. stocks. The total cost of the fund (TER) is 0.07% per annum. It started its operations on May 22, 2012, and the country of registration is Ireland. The current size of assets is EUR 29,810 million.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="bg-white rounded-lg shadow-lg">
                            <AssetDetailsCardTitle cardTitle="Chart"/>
                            <TradingViewWidget />
                        </div>
                        <div className="bg-white rounded-lg shadow-lg">
                            <AssetDetailsCardTitle cardTitle="Return rates"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetDetails