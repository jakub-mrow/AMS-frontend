import React from 'react';
import { Line } from 'react-chartjs-2';
import { getDateFormatString } from '../../util/locale';
import { AssetDetailsInfoResponse, AssetPriceChange } from '../types';

interface OrignalChartProps {
    assetDetailsInfo: AssetDetailsInfoResponse
}

export const OriginalChart: React.FC<OrignalChartProps> = ({ assetDetailsInfo }) => {

    const dates = assetDetailsInfo.price_changes.map((priceChange: AssetPriceChange) => priceChange.date.valueOf());
    const closeValues = assetDetailsInfo.price_changes.map((priceChange: AssetPriceChange) => priceChange.close);
    
    const data = {
        dates,
        closeValues
    }
    return (
        <div className="container bg-white rounded-xl">
            <Line data={{
                labels: data.dates,
                datasets: [
                    {
                        label: 'Stock Price',
                        data: data.closeValues,
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 3,
                        pointRadius: 0,
                    },
                ],
            }} options={{
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
                    },
                    y: {
                        min: Math.min(...data.closeValues) - 5,
                        max: Math.max(...data.closeValues) + 5,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Custom Chart Title',
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    }
                }
            }} />
        </div>
    );
};