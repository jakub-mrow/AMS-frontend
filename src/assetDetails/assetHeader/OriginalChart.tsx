import React from 'react';
import { getDateFormatString } from '../../util/locale';
import { AssetDetailsInfoResponse, AssetPriceChange } from '../types';
import { Result } from '../../appBar/use-search-bar';

import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import AssetDetailsPriceValues from '../assetBodyCards/AssetDetailsPriceValues';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

interface OrignalChartProps {
    assetDetailsData: Result;
    assetDetailsInfo: AssetDetailsInfoResponse
}

export const OriginalChart: React.FC<OrignalChartProps> = ({ assetDetailsInfo, assetDetailsData }) => {

    const dates = assetDetailsInfo.priceChanges.map((priceChange: AssetPriceChange) => priceChange.date.valueOf());
    const closeValues = assetDetailsInfo.priceChanges.map((priceChange: AssetPriceChange) => priceChange.close);

    const data = {
        dates,
        closeValues
    }

    return (
        <div className=" bg-white rounded-xl p-10 pt-6 w-full">
            <div className="flex flex-col space-y-2 mb-2">
                <span className="text-xl font-semibold">{assetDetailsData.Name}</span>
                <div className="space-x-2">
                    <span className="text-3xl font-bold ">{assetDetailsInfo.currentPrice}</span>
                    <span className="">{assetDetailsData.Currency}</span>
                    <span className={`font-bold text-xl ${assetDetailsInfo.percentageChangePreviousClose > 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {assetDetailsInfo.percentageChangePreviousClose > 0 ? '+' : ''}{assetDetailsInfo.percentageChangePreviousClose}%
                        Today
                    </span>
                </div>
            </div>
            <Chart type='line' data={{
                labels: data.dates,
                datasets: [
                    {
                        data: data.closeValues,
                        fill: true,
                        // for backgroundColor attribute it shows an error but it works XD
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        backgroundColor: (context) => {
                            if (!context.chart.chartArea) {
                                return null;
                            }

                            const { ctx, chartArea: { top, bottom } } = context.chart;
                            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                            gradientBg.addColorStop(0, 'rgba(67, 104, 185, 0.5)');
                            gradientBg.addColorStop(1, 'rgba(255, 255, 255, 1)')

                            return gradientBg;
                        } ,
                        borderColor: 'rgba(39,92,196,1)',
                        borderWidth: 2,
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
                        min: Math.max(parseFloat((Math.min(...data.closeValues) - 5).toFixed(3)), 0),
                        max: (Math.max(...data.closeValues) + 10).toFixed(3),
                        ticks: {
                            callback: (value) => value + ` ${assetDetailsData.Currency}`
                        }
                    },
                },
            }} />
            <AssetDetailsPriceValues />
        </div>
    );
};