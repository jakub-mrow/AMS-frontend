import { Tab, Tabs } from "@mui/material";
import { AssetsList } from "./AssetsList.tsx";
import { useState } from "react";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";
import { Asset, AssetType } from "../types.ts";

export const AssetsListWithTabs = ({
  stocks,
  bonds,
  deposits,
  cryptocurrencies,
  isLoading,
  goToAsset,
}: {
  stocks: Asset[];
  bonds: Asset[];
  deposits: Asset[];
  cryptocurrencies: Asset[];
  isLoading: boolean;
  goToAsset: (id: number) => void;
}) => {
  const [type, setType] = useState(AssetType.STOCK);

  const getAssetsOfType = (type: AssetType): Asset[] => {
    switch (type) {
      case AssetType.STOCK:
        return stocks.filter((asset) => asset.quantity > 0);
      case AssetType.BOND:
        return bonds.filter((asset) => asset.quantity > 0);
      case AssetType.DEPOSIT:
        return deposits.filter((asset) => asset.quantity > 0);
      case AssetType.CRYPTO:
        return cryptocurrencies.filter((asset) => asset.quantity > 0);
      default:
        exhaustiveGuard(type);
    }
  };

  return (
    <>
      <Tabs
        value={type}
        onChange={(_event, newValue) => setType(newValue)}
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
          <AssetsList
            assets={getAssetsOfType(type)}
            type={type}
            goToAsset={goToAsset}
          />
        </VerticalFlexContainer>
      )}
    </>
  );
};
