import AssetDetailsCardTitle from './AssetDetailsCardTitle'

const AssetDetailFrontCards = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded">
                <AssetDetailsCardTitle cardTitle='TER'/>
                <div className="flex flex-col p-4">
                    <span className="font-bold">0.07%</span>
                </div>
            </div>
            <div className="bg-white rounded">
                <AssetDetailsCardTitle cardTitle='Currency'/>
                <div className="flex flex-col p-4">
                    <span className="font-bold">USD</span>
                </div>
            </div>
            <div className="bg-white rounded">
                <AssetDetailsCardTitle cardTitle='Registration country'/>
                <div className="flex flex-col p-4">
                    <span className="font-bold">Ireland</span>
                </div>
            </div>
            <div className="bg-white rounded">
                <AssetDetailsCardTitle cardTitle='Distribution policy'/>
                <div className="flex flex-col p-4">
                    <span className="font-bold">Dividends</span>
                </div>
            </div>

        </div>
    )
}

export default AssetDetailFrontCards;