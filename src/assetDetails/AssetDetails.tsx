import AssetDetailsHeader from './assetHeader/AssetDetailsHeader';
import AssetOverviewCard from './assetBodyCards/AssetOverviewCard'
import AssetChartCard from './assetBodyCards/AssetChartCard'


const AssetDetails = () => {
    return (
        <div className="flex flex-col m-6 space-y-4">
            <AssetDetailsHeader/>
            <div className="flex flex-col m-6 p-4 bg-gray-100 rounded-lg shadow-lg border">
                <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-2 md:space-y-0">
                    <div className="flex-1 space-y-4">
                        <AssetOverviewCard/>
                    </div>
                    <div className="flex-1 space-y-4">
                        <AssetChartCard/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetDetails;