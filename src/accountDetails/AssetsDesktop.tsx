import { Box, Button, Typography } from "@mui/material";
import { AssetsTable } from "./AssetsTable.tsx";
import { Loading } from "../util/Loading.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";
import { Asset, AssetType } from "../types.ts";

const getTypeName = (type: AssetType) => {
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

export const AssetsDesktop = ({
  assets,
  type,
  isLoading,
  onAddAssetClick,
  goToAsset,
}: {
  assets: Asset[];
  type: AssetType;
  isLoading: boolean;
  onAddAssetClick: () => void;
  goToAsset: (id: number) => void;
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (assets.length === 0) {
    return (
      <VerticalFlexBox
        fullHeight
        sx={{
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mx: 8,
        }}
      >
        <Typography align="center" variant="h5">
          You don't have any {getTypeName(type)} yet
        </Typography>
        <Button variant={"contained"} onClick={onAddAssetClick}>
          Add {getTypeName(type)}
        </Button>
      </VerticalFlexBox>
    );
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"flex-end"} m={2}>
        <Button variant={"contained"} onClick={onAddAssetClick}>
          Add asset
        </Button>
      </Box>
      <AssetsTable assets={assets} type={type} goToAsset={goToAsset} />
    </>
  );
};
