import AssetDetailsCardTitle from './AssetDetailsCardTitle'
import TradingViewWidget from './TradingViewWidget'

const AssetChartCard = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg">
            <AssetDetailsCardTitle cardTitle="Chart" />
            <TradingViewWidget />
        </div>
    )
}

export default AssetChartCard