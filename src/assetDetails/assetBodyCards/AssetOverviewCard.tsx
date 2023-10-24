import { AssetDetailsDataProps } from "../use-asset-details"
import AssetDetailsCardTitle from "./AssetDetailsCardTitle"
import AssetDetailsPriceValues from "./AssetDetailsPriceValues"
import AssetOverviewBody from "./AssetOverviewBody"
import AssetOverviewHeader from "./AssetOverviewHeader"

const AssetOverviewCard: React.FC<AssetDetailsDataProps> = ({ assetDetailsData }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg">
            <AssetDetailsCardTitle cardTitle="Overview" />
            <AssetOverviewHeader assetDetailsData={assetDetailsData} />
            <AssetDetailsPriceValues />
            <AssetOverviewBody />
        </div>
    )
}

export default AssetOverviewCard