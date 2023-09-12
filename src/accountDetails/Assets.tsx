import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { AssetsList } from "./AssetsList.tsx";
import { Asset, AssetTypes } from "./assets-mock.ts";
import { useState } from "react";

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
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <AssetsList assets={assets} type={assetsType} />
      )}
    </>
  );
};
