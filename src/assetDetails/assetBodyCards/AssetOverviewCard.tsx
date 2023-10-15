import AssetDetailsCardTitle from "./AssetDetailsCardTitle"
import AssetDetailsPriceValues from "./AssetDetailsPriceValues"
import AssetOverviewBody from "./AssetOverviewBody"
import AssetOverviewHeader from "./AssetOverviewHeader"

const AssetOverviewCard = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg">
            <AssetDetailsCardTitle cardTitle="Overview" />
            <AssetOverviewHeader />
            <AssetDetailsPriceValues />
            <AssetOverviewBody />
        </div>
    )
}

export default AssetOverviewCard