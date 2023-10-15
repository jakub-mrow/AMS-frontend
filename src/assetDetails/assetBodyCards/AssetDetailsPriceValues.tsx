

type ConvertedRanges = {
    today: string;
    week: string;
    month_1: string;
    month_6: string;
    year_1: string;
    year_5: string;
};

type PriceValues = {
    today: number;
    week: number;
    month_1: number;
    month_6: number;
    year_1: number;
    year_5: number;
};

const AssetDetailsPriceValues = () => {

    const convertedRanges: ConvertedRanges = {
        today: "Today",
        week: "Week",
        month_1: "1 month",
        month_6: "6 months",
        year_1: "1 year",
        year_5: "5 years",
    }

    const priceValues: PriceValues = {
        today: 0.29,
        week: -0.29,
        month_1: 0.29,
        month_6: 0.29,
        year_1: -0.30,
        year_5: 0.30
    }

    return (
        <div className="grid grid-rows-2 grid-flow-col lg:grid-rows-1">
            {Object.entries(priceValues).map(([key, value]) => (
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