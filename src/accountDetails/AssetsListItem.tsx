import { Box, Divider, ListItem, ListItemText } from "@mui/material";
import { Asset } from "./assets-mock.ts";

export const AssetsListItem = ({ asset }: { asset: Asset }) => (
  <>
    <ListItem>
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
          />
        </Box>
      </ListItemText>
    </ListItem>
    <Divider />
  </>
);
