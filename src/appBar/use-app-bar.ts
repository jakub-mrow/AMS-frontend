import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

export type AppBarButton = {
  name: string;
  action: () => void;
};
export const useAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDrawerButtonVisible = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerToggle = () => {
    setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen);
  };

  const buttons: AppBarButton[] = [];

  return {
    drawerOpen,
    isDrawerButtonVisible,
    drawerToggle,
    buttons,
  };
};
