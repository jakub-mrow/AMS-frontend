import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Asset } from "../types.ts";

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
          primary={`${asset.value} ${asset.currency}`}
          primaryTypographyProps={{ align: "right" }}
          secondary={`${asset.result}%`}
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
