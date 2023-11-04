import { FundamentalData } from "react-tradingview-embed"
import { AssetDetailsDataProps } from "../use-asset-details"

const AssetOverviewBody: React.FC<AssetDetailsDataProps> = ({ assetDetailsData }) => {
    let symbol: string;
    switch (assetDetailsData.Type) {
        case 'Common Stock':
            if (assetDetailsData.Exchange === "US"){
                assetDetailsData.Exchange = "NASDAQ"
            }
            symbol = `${assetDetailsData.Exchange}:${assetDetailsData.Code}`;
            console.log(symbol);
            break;
        case 'ETF':
            symbol = `${assetDetailsData.Exchange}:${assetDetailsData.Code}`
            break;
        case 'Currency':
            symbol = "COINBASE:BTCUSD"
            break;
        default:
            symbol = `${assetDetailsData.Code}`
            break;
    }

    return (
        <div className="flex items-center justify-center p-4 pb-8">
            <FundamentalData widgetProps={{"colorTheme": "light", symbol: symbol}}/>
        </div>
        
    )
}

export default AssetOverviewBody