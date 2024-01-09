import {
  AppBar as MUIAppBar,
  Box,
  Button,
  IconButton,
  styled,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import { useAppBar } from "./use-app-bar.ts";
import { useNavigate } from "react-router-dom";
import { LogoutModal } from "./LogoutModal.tsx";
import SearchBar from "./SearchBar.tsx";
import { SiChartdotjs } from "react-icons/si";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const AppBar = () => {
  const {
    drawerOpen,
    drawerToggle,
    isDrawerButtonVisible,
    buttons,
    handleLogoutAction,
    setLogoutModalOpen,
    isLogoutModalOpen,
  } = useAppBar();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

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
          {isDesktop ? (
            <div className="flex flex-row items-center w-full justify-between m-2">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  userSelect: "none",
                  cursor: "pointer",
                  gap: "8px",
                }}
                onClick={() => navigate("/")}
              >
                <SiChartdotjs size={58} />
                <Typography variant="h3" className="font-sans">
                  AMS
                </Typography>
              </Box>
              <SearchBar />
            </div>
          ) : (
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
              <Typography variant="h3" className="font-poppins">
                AMS
              </Typography>
            </Box>
          )}

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
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onLogout={handleLogoutAction}
      />
      <Box component="nav">
        <Drawer open={drawerOpen} toggle={drawerToggle} items={buttons} />
      </Box>
      <Offset />
    </>
  );
};

export default AppBar;
