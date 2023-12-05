import { List, Typography } from "@mui/material";
import { AssetsListItem } from "./AssetsListItem.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { Asset, AssetType } from "../types.ts";

export const AssetsList = ({
  assets,
  type,
  goToAsset,
}: {
  assets: Asset[];
  type: AssetType;
  goToAsset: (id: number) => void;
}) => {
  const getTypeName = () => {
    switch (type) {
      case AssetType.STOCK:
        return "stocks";
      case AssetType.BOND:
        return "bonds";
      case AssetType.DEPOSIT:
        return "deposits";
      case AssetType.CRYPTO:
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
          key={asset.id}
          asset={asset}
          type={type}
          goToAsset={() => goToAsset(asset.id)}
        />
      ))}
    </List>
  );
};
