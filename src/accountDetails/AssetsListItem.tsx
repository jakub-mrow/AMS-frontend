import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Asset } from "./assets-mock.ts";
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
            secondary={`${
              asset.result > 0 ? "+" : asset.result < 0 ? "-" : ""
            }${asset.result}%`}
            secondaryTypographyProps={{
              align: "right",
              color: asset.result > 0 ? "green" : asset.result < 0 ? "red" : "",
            }}
            sx={{ mr: 2 }}
          />
        </Box>
      </ListItemText>
    </ListItem>
    <Divider />
  </>
);
