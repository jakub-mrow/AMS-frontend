import { Box, Button, Typography } from "@mui/material";
import { AssetsTable } from "./AssetsTable.tsx";
import { Asset, AssetTypes } from "./assets-mock.ts";
import { Loading } from "./Loading.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";

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

export const AssetsDesktop = ({
  assets,
  type,
  isLoading,
  onAddAssetClick,
}: {
  assets: Asset[];
  type: AssetTypes;
  isLoading: boolean;
  onAddAssetClick: () => void;
}) => {
  const assetsOfType = assets.filter((asset) => asset.type === type);

  if (isLoading) {
    return <Loading />;
  }

  if (assetsOfType.length === 0) {
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
        <Typography align="center" variant="h3">
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
      <AssetsTable assets={assetsOfType} />
    </>
  );
};
