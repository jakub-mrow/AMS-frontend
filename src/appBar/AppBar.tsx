import {
  AppBar as MUIAppBar,
  Box,
  Button,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import { useAppBar } from "./use-app-bar.ts";
import { useNavigate } from "react-router-dom";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const AppBar = () => {
  const { drawerOpen, drawerToggle, isDrawerButtonVisible, buttons } =
    useAppBar();
  const navigate = useNavigate();

  return (
    <>
      <MUIAppBar position="fixed" component="nav">
        <Toolbar>
          {isDrawerButtonVisible && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={drawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignSelf: "stretch",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Typography variant="h3">AMS</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          {!isDrawerButtonVisible && (
            <Box>
              {buttons.map((button) => (
                <Button key={button.name} onClick={button.action} color="white">
                  {button.name}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </MUIAppBar>
      <Box component="nav">
        <Drawer open={drawerOpen} toggle={drawerToggle} items={buttons} />
      </Box>
      <Offset />
    </>
  );
};

export default AppBar;