import AssetDetailsHeader from './assetHeader/AssetDetailsHeader';
import { useAssetDetails } from './use-asset-details';
import News from '../news/News';
import { Loading } from '../util/Loading';
import { ChartTabs } from './assetHeader/ChartTabs';


const AssetDetails = () => {
    const { assetDetailsData, assetDetailsInfo, isLoading, assetHistoryPrices } = useAssetDetails();
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                assetDetailsData && assetDetailsInfo && (
                    <div className="container mx-auto flex flex-col m-6 space-y-4">
                        <AssetDetailsHeader assetDetailsData={assetDetailsData} assetDetailsInfo={assetDetailsInfo} />
                        <ChartTabs assetDetailsInfo={assetDetailsInfo} assetDetailsData={assetDetailsData} assetHistoryPrices={assetHistoryPrices}/>
                        <News ticker={assetDetailsData.Code} />
                    </div>
                )
            )}
        </>
    );
}

export default AssetDetails;