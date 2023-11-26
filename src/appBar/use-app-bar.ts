import { useContext, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import AuthContext from "../auth/auth-context";

export type AppBarButton = {
  name: string;
  action: () => void;
};
export const useAppBar = () => {
  const authContext = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDrawerButtonVisible = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerToggle = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutAction = () => {
    setLogoutModalOpen(false);
    authContext.onLogout();
  };

  const buttons: AppBarButton[] = [
    {
      name: "Logout",
      action: () => {
        setLogoutModalOpen(true);
      },
    }
  ];

  return {
    drawerOpen,
    isDrawerButtonVisible,
    drawerToggle,
    buttons,
    isLogoutModalOpen,
    setLogoutModalOpen,
    handleLogoutAction
  };
};
