import { AssetHistoryPrices } from "../types";

type ConvertedRanges = {
    today: string;
    week: string;
    month: string;
    three_months: string;
    six_months: string;
    year: string;
    three_years: string;
    five_years: string;
    all_time: string;
};

interface AssetDetailsPriceValuesProps {
    assetHistoryPrices: AssetHistoryPrices;

}

const AssetDetailsPriceValues: React.FC<AssetDetailsPriceValuesProps> = ({ assetHistoryPrices }) => {

    const convertedRanges: ConvertedRanges = {
        today: "Today",
        week: "Week",
        month: "1 month",
        three_months: "3 months",
        six_months: "6 months",
        year: "1 year",
        three_years: "3 years",
        five_years: "5 years",
        all_time: "All time"
    }
    

    return (
        <div className="grid grid-rows-2 grid-flow-col lg:grid-rows-1">
            {Object.entries(assetHistoryPrices)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([key, _]) => key !== 'three_months' && key !== 'three_years')
                .map(([key, value]) => (
                <div
                    key={key}
                    className={`flex flex-col justify-center items-center bg-white rounded-lg m-2 p-4 hover:bg-gray-100 transition duration-300 ease-in-out `}
                >
                    <span className="whitespace-nowrap">
                        {convertedRanges[key as keyof ConvertedRanges]}
                    </span>
                    <span className={`${value >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {value}%
                    </span>
                </div>
            ))}
        </div>
    )
}

export default AssetDetailsPriceValues;