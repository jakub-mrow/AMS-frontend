import { AssetDetailsDataProps } from "../use-asset-details"
import AssetOverviewBody from "./AssetOverviewBody"
import AssetOverviewHeader from "./AssetOverviewHeader"

const AssetOverviewCard: React.FC<AssetDetailsDataProps> = ({ assetDetailsData, assetDetailsInfo }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg">
            <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg border">
                <AssetOverviewHeader assetDetailsData={assetDetailsData} assetDetailsInfo={assetDetailsInfo} />
            </div>
            <AssetOverviewBody assetDetailsData={assetDetailsData} assetDetailsInfo={assetDetailsInfo} />
        </div>
    )
}

export default AssetOverviewCard