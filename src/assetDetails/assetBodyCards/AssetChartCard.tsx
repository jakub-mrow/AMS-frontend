import { AssetDetailsDataProps } from '../use-asset-details';
import { AdvancedChart } from "react-tradingview-embed"

const AssetChartCard: React.FC<AssetDetailsDataProps> = ({ assetDetailsData }) => {
    let symbol: string;
    switch (assetDetailsData.Type) {
        case 'Common Stock':
            if (assetDetailsData.Exchange === "US") {
                symbol = `NASDAQ:${assetDetailsData.Code}`;
            } else if (assetDetailsData.Exchange === "WAR") {
                symbol = `GPW:${assetDetailsData.Code}`;
            } else {
                symbol = `${assetDetailsData.Exchange}:${assetDetailsData.Code}`;
            }
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
        <AdvancedChart widgetProps={{ theme: "light", symbol: symbol }} />
    )
}

export default AssetChartCard