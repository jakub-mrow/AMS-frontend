import { Tab, Tabs } from "@mui/material";
import { AssetsList } from "./AssetsList.tsx";
import { Asset, AssetTypes } from "./assets-mock.ts";
import { useState } from "react";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "./Loading.tsx";

export const Assets = ({
  assets,
  isLoading,
}: {
  assets: Asset[];
  isLoading: boolean;
}) => {
  const [assetsType, setAssetsType] = useState(AssetTypes.STOCKS);
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
          <AssetsList assets={assets} type={assetsType} />
        </VerticalFlexContainer>
      )}
    </>
  );
};
