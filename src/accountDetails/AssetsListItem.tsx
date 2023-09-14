import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Asset, getAssetResultColor } from "./assets-mock.ts";
import { Delete } from "@mui/icons-material";

export const AssetsListItem = ({ asset }: { asset: Asset }) => (
  <>
    <ListItem
      secondaryAction={
        <IconButton edge="end">
          <Delete />
        </IconButton>
      }
    >
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
            primary={`${asset.total} ${asset.currency}`}
            primaryTypographyProps={{ align: "right" }}
            secondary={`${asset.result}%`}
            secondaryTypographyProps={{
              align: "right",
              color: getAssetResultColor(asset),
            }}
            sx={{ mr: 2 }}
          />
        </Box>
      </ListItemText>
    </ListItem>
    <Divider />
  </>
);
