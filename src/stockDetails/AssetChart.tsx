import { AssetBalanceHistory } from "../types.ts";
import { Line } from "react-chartjs-2";
import { Loading } from "../util/Loading.tsx";
import { getDateFormatString, getUserLocale } from "../util/locale.ts";
import {
  displayCurrency,
  displayCurrencyWithKMB,
} from "../util/display-currency.ts";

export const AssetChart = ({
  histories,
  stockCurrency,
  isLoading,
  isMobile,
}: {
  isLoading: boolean;
  stockCurrency: string;
  histories: AssetBalanceHistory[];
  isMobile: boolean;
}) => {
  const mapHistory = (history: AssetBalanceHistory) => ({
    x: history.date.valueOf(),
    y: history.price * history.quantity,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Line
          width={isMobile ? undefined : 100}
          data={{
            datasets: [
              {
                label: "Balance",
                data: histories.map(mapHistory),
                //backgroundColor: theme.palette.primary.main,
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
                },
                borderColor: 'rgba(39,92,196,1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
              },
            ],
          }}
          options={{
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
            },
            layout: {
              padding: 10,
            },
            locale: getUserLocale(),
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
                beginAtZero: true,
                ticks: {
                  callback: (value) => {
                    return displayCurrencyWithKMB(Number(value), stockCurrency);
                  },
                },
              },
            },
            maintainAspectRatio: isMobile,
            aspectRatio: 1,
            plugins: {
              tooltip: {
                mode: "nearest",
                axis: "x",
                intersect: false,
                callbacks: {
                  label: (context) => {
                    return (
                      context.dataset.label +
                      ": " +
                      displayCurrency(context.parsed.y, stockCurrency)
                    );
                  },
                },
              },
              zoom: {
                pan: {
                  enabled: true,
                  mode: "xy",
                },
                zoom: {
                  scaleMode: "xy",
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "xy",
                },
                limits: {
                  x: {
                    min: "original",
                    max: "original",
                    minRange: 1000 * 60 * 60 * 24 * 7,
                  },
                  y: {
                    min: 0,
                    max: "original",
                    minRange:
                      histories
                        .map((history) => history.price * history.quantity)
                        .reduce((a, b) => Math.max(a, b), 0) / 10,
                  },
                },
              },
            },
          }}
        />
      )}
    </>
  );
};
