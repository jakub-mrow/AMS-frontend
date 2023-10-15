import { FundamentalData } from "react-tradingview-embed"

const AssetOverviewBody = () => {
    return (
        <div className="flex items-center justify-center p-4 pb-8">
            <FundamentalData widgetProps={{"colorTheme": "light"}}/>
        </div>
        
    )
}

export default AssetOverviewBody