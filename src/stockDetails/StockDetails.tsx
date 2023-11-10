import { Theme, useMediaQuery } from "@mui/material";
import { StockDetailsMobile } from "./StockDetailsMobile.tsx";
import { StockDetailsDesktop } from "./StockDetailsDesktop.tsx";

export const StockDetails = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  if (isDesktop) {
    return <StockDetailsDesktop />;
  }
  return <StockDetailsMobile />;
};
