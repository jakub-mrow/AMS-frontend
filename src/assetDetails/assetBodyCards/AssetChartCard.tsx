import { AssetDetailsDataProps } from '../use-asset-details';
import AssetDetailsCardTitle from './AssetDetailsCardTitle'
import { AdvancedChart } from "react-tradingview-embed"

const AssetChartCard: React.FC<AssetDetailsDataProps> = ({ assetDetailsData }) => {
    let symbol: string;
    switch (assetDetailsData.Type) {
        case 'Common Stock':
            if (assetDetailsData.Exchange === "US"){
                assetDetailsData.Exchange = "NASDAQ"
            }
            symbol = `${assetDetailsData.Exchange}:${assetDetailsData.Code}`;
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
        <div className="bg-white rounded-lg shadow-lg">
            <AssetDetailsCardTitle cardTitle="Chart" />
            <AdvancedChart widgetProps={{ theme: "light", symbol: symbol }}/>
        </div>
    )
}

export default AssetChartCard