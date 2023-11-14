import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./config/theme.ts";
import AuthProvider from "./auth/AuthProvider.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarContextProvider } from "./snackbar/SnackbarContextProvider.tsx";
import "dayjs/locale/pl.js";
import { getDayjsLocale, loadLocale } from "./util/locale.ts";
import {
  Chart,
  Decimation,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import ZoomPlugin from "chartjs-plugin-zoom";

loadLocale();

Chart.register(
  TimeScale,
  TimeSeriesScale,
  LinearScale,
  PointElement,
  LineElement,
  ZoomPlugin,
  Decimation,
  Filler,
  Tooltip,
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={getDayjsLocale()}
          >
            <SnackbarContextProvider>
              <App />
            </SnackbarContextProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
