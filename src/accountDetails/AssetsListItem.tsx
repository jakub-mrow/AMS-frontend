import { Box, Divider, ListItem, ListItemText } from "@mui/material";
import { Asset } from "../types.ts";
import { displayCurrency } from "../util/display-currency.ts";

export const AssetsListItem = ({
  asset,
  goToAsset,
}: {
  asset: Asset;
  goToAsset: () => void;
}) => {
  const getListItem = () => (
    <ListItemText>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ListItemText primary={asset.name} secondary={asset.exchange} />
        <ListItemText
          primary={displayCurrency(
            asset.price * asset.quantity,
            asset.currency,
          )}
          primaryTypographyProps={{ align: "right" }}
          secondary={asset.displayResult()}
          secondaryTypographyProps={{
            align: "right",
            color: asset.getResultColor(),
          }}
          sx={{ mr: 2 }}
        />
      </Box>
    </ListItemText>
  );
  return (
    <>
      <ListItem onClick={goToAsset}>{getListItem()}</ListItem>
      <Divider />
    </>
  );
};
