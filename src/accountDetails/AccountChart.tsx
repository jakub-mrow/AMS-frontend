import { AccountHistory } from "../types.ts";
import { useTheme } from "@mui/material";
import { Loading } from "../util/Loading.tsx";
import { Line } from "react-chartjs-2";
import { getDateFormatString, getUserLocale } from "../util/locale.ts";
import {
  displayCurrency,
  displayCurrencyWithKMB,
} from "../util/display-currency.ts";

export const AccountChart = ({
  histories,
  currency,
  isLoading,
  isMobile,
}: {
  isLoading: boolean;
  currency: string;
  histories: AccountHistory[];
  isMobile: boolean;
}) => {
  const theme = useTheme();

  const mapHistory = (history: AccountHistory) => ({
    x: history.date.valueOf(),
    y: history.amount,
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
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
                pointBackgroundColor: theme.palette.secondary.main,
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
                    return displayCurrencyWithKMB(Number(value), currency);
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
                      displayCurrency(context.parsed.y, currency)
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
                        .map((history) => history.amount)
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
