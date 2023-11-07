import { Tab, Tabs } from "@mui/material";
import { AssetsList } from "./AssetsList.tsx";
import { useState } from "react";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "./Loading.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";
import { Asset, Bond, Cryptocurrency, Deposit, Stock } from "./types.ts";

export enum AssetsType {
  STOCKS,
  BONDS,
  DEPOSITS,
  CRYPTO,
}

export const AssetsListWithTabs = ({
  stocks,
  bonds,
  deposits,
  cryptocurrencies,
  isLoading,
}: {
  stocks: Stock[];
  bonds: Bond[];
  deposits: Deposit[];
  cryptocurrencies: Cryptocurrency[];
  isLoading: boolean;
}) => {
  const [assetsType, setAssetsType] = useState(AssetsType.STOCKS);

  const getAssetsOfType = (type: AssetsType): Asset[] => {
    switch (type) {
      case AssetsType.STOCKS:
        return stocks;
      case AssetsType.BONDS:
        return bonds;
      case AssetsType.DEPOSITS:
        return deposits;
      case AssetsType.CRYPTO:
        return cryptocurrencies;
      default:
        exhaustiveGuard(type);
    }
  };

  return (
    <>
      <Tabs
        value={assetsType}
        onChange={(_event, newValue) => setAssetsType(newValue)}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab label="Stocks" />
        <Tab label="Bonds" />
        <Tab label="Deposits" />
        <Tab label="Crypto" />
      </Tabs>
      {isLoading ? (
        <Loading />
      ) : (
        <VerticalFlexContainer
          fullHeight
          maxWidth="md"
          sx={{
            minHeight: 0,
          }}
        >
          <AssetsList assets={getAssetsOfType(assetsType)} type={assetsType} />
        </VerticalFlexContainer>
      )}
    </>
  );
};
