import { AssetDetailsDataProps } from "../use-asset-details";

const AssetOverviewHeader: React.FC<AssetDetailsDataProps> = ({ assetDetailsData, assetDetailsInfo }) => {
    return (
        <div className="flex flex-col m-6">
            <div className="flex flex-row space-x-4 items-center justify-between">
                <div className="flex flex-row space-x-4">
                    <div className="space-x-2">
                        <span className="text-4xl font-bold ">{assetDetailsInfo.currentPrice}</span>
                        <span className="">{assetDetailsData.Currency}</span>
                        <span className={`font-bold text-xl ${assetDetailsInfo.percentageChangePreviousClose > 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {assetDetailsInfo.percentageChangePreviousClose > 0 ? '+' : ''}{assetDetailsInfo.percentageChangePreviousClose}%
                    </span>
                    </div>
                </div>
        
                <div className="flex flex-row border rounded-lg space-x-4 p-2 justify-center items-center">
                    <div>
                        <span>Ticker: </span>
                        <span className="font-bold">{assetDetailsData.Code}</span>
                    </div>
                    <div>
                        <span>Exchange: </span>
                        <span className="font-bold">{assetDetailsData.Exchange}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetOverviewHeader;