import { Box, CircularProgress, Container, Tab, Tabs } from "@mui/material";
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
      <Container maxWidth="md" sx={{ mb: "56px" }}>
        {isLoading ? (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <AssetsList assets={assets} type={assetsType} />
          </>
        )}
      </Container>
    </>
  );
};
