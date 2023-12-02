import React from 'react';
import { getDateFormatString } from '../../util/locale';
import { AssetDetailsInfoResponse, AssetPriceChange } from '../types';
import { Result } from '../../appBar/use-search-bar';

import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

interface OrignalChartProps {
    assetDetailsData: Result;
    assetDetailsInfo: AssetDetailsInfoResponse
}

export const OriginalChart: React.FC<OrignalChartProps> = ({ assetDetailsInfo, assetDetailsData }) => {

    const dates = assetDetailsInfo.price_changes.map((priceChange: AssetPriceChange) => priceChange.date.valueOf());
    const closeValues = assetDetailsInfo.price_changes.map((priceChange: AssetPriceChange) => priceChange.close);

    const data = {
        dates,
        closeValues
    }

    return (
        <div className="container bg-white rounded-xl p-10 pt-6">
            <div className="flex flex-col space-y-2 mb-2">
                <span className="text-xl font-semibold">{assetDetailsData.Name}</span>
                <div className="space-x-2">
                    <span className="text-3xl font-bold ">{assetDetailsInfo.current_price}</span>
                    <span className="">{assetDetailsData.Currency}</span>
                    <span className={`font-bold text-xl ${assetDetailsInfo.percentage_change_previous_close > 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {assetDetailsInfo.percentage_change_previous_close > 0 ? '+' : ''}{assetDetailsInfo.percentage_change_previous_close}%
                    </span>
                </div>
            </div>

            <Chart type='line' data={{
                labels: data.dates,
                datasets: [
                    {
                        data: data.closeValues,
                        fill: false,
                        borderColor: 'rgba(39,92,196,1)',
                        borderWidth: 3,
                        pointRadius: 0,
                    },
                ],
            }} options={{
                interaction: {
                    mode: "nearest",
                    axis: "x",
                    intersect: false,
                },
                scales: {
                    x: {
                        type: "time",
                        ticks: {
                            maxRotation: 0,
                        },
                        time: {
                            minUnit: "day",
                            tooltipFormat: getDateFormatString(),
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        min: Math.min(...data.closeValues) - 5,
                        max: Math.max(...data.closeValues) + 5,
                        ticks: {
                            callback: (value) => value + ` ${assetDetailsData.Currency}`
                        }
                    },
                },
            }} />
        </div>
    );
};