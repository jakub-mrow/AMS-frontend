import AssetDetailsHeader from './assetHeader/AssetDetailsHeader';
import AssetOverviewCard from './assetBodyCards/AssetOverviewCard'
import AssetChartCard from './assetBodyCards/AssetChartCard'
import { useAssetDetails } from './use-asset-details';
import News from '../news/News';


const AssetDetails = () => {
    const { assetDetailsData } = useAssetDetails();

    return (
        <>
            { assetDetailsData && (
                <div className="flex flex-col m-6 space-y-4">
                    <AssetDetailsHeader assetDetailsData={assetDetailsData} />
                    <div className="flex flex-col m-6 p-4 bg-white rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-2 md:space-y-0 mb-10">
                            <div className="flex-1 space-y-4">
                                <AssetOverviewCard assetDetailsData={assetDetailsData} />
                            </div>
                            <div className="flex-1 space-y-4">
                                <AssetChartCard assetDetailsData={assetDetailsData}/>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl">
                            <News ticker={assetDetailsData.Code}/>
                        </div>
                        
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default AssetDetails;