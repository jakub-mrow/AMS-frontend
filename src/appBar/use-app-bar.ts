import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type AppBarButton = {
  name: string;
  action: () => void;
};
export const useAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDrawerButtonVisible = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const drawerToggle = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  const buttons: AppBarButton[] = [
    {
      name: "Accounts",
      action: () => navigate("/accounts"),
    },
  ];

  return {
    drawerOpen,
    isDrawerButtonVisible,
    drawerToggle,
    buttons,
  };
};
