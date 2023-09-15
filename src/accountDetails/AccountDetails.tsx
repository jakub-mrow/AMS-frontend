import { Theme, useMediaQuery } from "@mui/material";
import { AccountDetailsMobile } from "./AccountDetailsMobile.tsx";
import { AccountDetailsDesktop } from "./AccountDetailsDesktop.tsx";

export const AccountDetails = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  if (isDesktop) {
    return <AccountDetailsDesktop />;
  }
  return <AccountDetailsMobile />;
};
