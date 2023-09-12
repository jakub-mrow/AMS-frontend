import { Box, List, Typography } from "@mui/material";
import { AssetsListItem } from "./AssetsListItem.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";
import { Asset, AssetTypes } from "./assets-mock.ts";

const getTypeName = (type: AssetTypes) => {
  switch (type) {
    case AssetTypes.STOCKS:
      return "stocks";
    case AssetTypes.BONDS:
      return "bonds";
    case AssetTypes.DEPOSITS:
      return "deposits";
    case AssetTypes.CRYPTO:
      return "crypto";
    default:
      exhaustiveGuard(type);
  }
};

export const AssetsList = ({
  assets,
  type,
}: {
  assets: Asset[];
  type: AssetTypes;
}) => {
  const assetsOfType = assets.filter((asset) => asset.type === type);
  if (assetsOfType.length === 0) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography align="center" variant="h3">
          You don't have any {getTypeName(type)} yet
        </Typography>
      </Box>
    );
  }
  return (
    <List sx={{ flex: 1, overflowY: "auto" }}>
      {assetsOfType.map((asset) => (
        <AssetsListItem key={asset.isin} asset={asset} />
      ))}
    </List>
  );
};
