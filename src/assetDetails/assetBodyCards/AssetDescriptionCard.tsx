import AssetDetailsCardTitle from './AssetDetailsCardTitle'

const AssetDescriptionCard = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg">
            <AssetDetailsCardTitle cardTitle="Description" />
            <p className="p-4">
                The S&P 500 Index tracks the 500® largest U.S. stocks. The total cost of the fund (TER) is 0.07% per annum. It started its operations on May 22, 2012, and the country of registration is Ireland. The current size of assets is EUR 29,810 million.
            </p>
        </div>
    )
}

export default AssetDescriptionCard