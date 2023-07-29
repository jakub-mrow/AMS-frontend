import MUIDrawer from "@mui/material/Drawer";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { AppBarButton } from "./use-app-bar.ts";

const Drawer = ({
  items,
  open,
  toggle,
}: {
  toggle: () => void;
  open: boolean;
  items: AppBarButton[];
}) => {
  const content = (
    <Box onClick={toggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" component="h1" sx={{ my: 2 }}>
        AMS
      </Typography>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={item.action} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <MUIDrawer
      open={open}
      onClose={toggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 240,
        },
      }}
    >
      {content}
    </MUIDrawer>
  );
};

export default Drawer;
