import { List, Typography } from "@mui/material";
import { AssetsListItem } from "./AssetsListItem.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { AssetsType } from "./AssetsListWithTabs.tsx";
import { Asset } from "./types.ts";

export const AssetsList = ({
  assets,
  type,
  goToAsset,
}: {
  assets: Asset[];
  type: AssetsType;
  goToAsset: (isin: string) => void;
}) => {
  const getTypeName = () => {
    switch (type) {
      case AssetsType.STOCKS:
        return "stocks";
      case AssetsType.BONDS:
        return "bonds";
      case AssetsType.DEPOSITS:
        return "deposits";
      case AssetsType.CRYPTO:
        return "crypto";
      default:
        exhaustiveGuard(type);
    }
  };

  if (assets.length === 0) {
    return (
      <VerticalFlexBox
        fullHeight
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography align="center" variant="h3">
          You don't have any {getTypeName()} yet
        </Typography>
      </VerticalFlexBox>
    );
  }
  return (
    <List sx={{ flex: 1, overflowY: "auto" }}>
      {assets.map((asset) => (
        <AssetsListItem
          key={asset.getKey()}
          asset={asset}
          goToAsset={() => goToAsset(asset.getKey())}
        />
      ))}
    </List>
  );
};
