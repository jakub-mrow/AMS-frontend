import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Asset, Stock } from "./types.ts";

export const AssetsListItem = ({
  asset,
  goToAsset,
}: {
  asset: Asset;
  goToAsset: () => void;
}) => {
  const getListItem = () => {
    if (asset instanceof Stock) {
      return (
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
              primary={`${asset.value} ${asset.currency}`}
              primaryTypographyProps={{ align: "right" }}
              secondary={`${asset.getResult()}%`}
              secondaryTypographyProps={{
                align: "right",
                color: asset.getResultColor(),
              }}
              sx={{ mr: 2 }}
            />
          </Box>
        </ListItemText>
      );
    } else {
      return <ListItemText>Not implemented</ListItemText>;
    }
  };
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton edge="end">
            <Delete />
          </IconButton>
        }
        onClick={goToAsset}
      >
        {getListItem()}
      </ListItem>
      <Divider />
    </>
  );
};
