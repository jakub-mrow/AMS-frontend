import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
  LinearProgress,
  Zoom,
} from "@mui/material";
import { DialogType, useAccountDetails } from "./use-account-details";
import { useState } from "react";
import {
  Add,
  Equalizer,
  FormatListNumbered,
  Settings,
  Timeline,
} from "@mui/icons-material";
import { Assets } from "./Assets.tsx";
import { Transactions } from "./Transactions.tsx";
import { AccountDetailsDialog } from "./AccountDetailsDialog.tsx";
import { Summary } from "./Summary.tsx";

enum MobilePage {
  ASSETS,
  TRANSACTIONS,
  SUMMARY,
}

type FabData = {
  value: MobilePage;
  icon: JSX.Element;
  onClick: () => void;
};

export const AccountDetails = () => {
  const {
    account,
    accountTransactions,
    assets,
    isLoading,
    isDialogOpen,
    openDialog,
    closeDialog,
    onConfirmDialog,
    dialogType,
    onDeleteTransaction,
  } = useAccountDetails();

  const [mobilePage, setMobilePage] = useState(MobilePage.ASSETS);

  const fabs: FabData[] = [
    {
      value: MobilePage.ASSETS,
      icon: <Add />,
      onClick: () => openDialog(DialogType.TRANSACTION),
    },
    {
      value: MobilePage.TRANSACTIONS,
      icon: <Add />,
      onClick: () => openDialog(DialogType.TRANSACTION),
    },
    {
      value: MobilePage.SUMMARY,
      icon: <Settings />,
      onClick: () => openDialog(DialogType.TRANSACTION),
    },
  ];

  if (!account) {
    return <LinearProgress />;
  }

  return (
    <Box
      sx={{ flex: 1, display: "flex", minHeight: 0, flexDirection: "column" }}
    >
      {mobilePage === MobilePage.ASSETS && (
        <Assets assets={assets} isLoading={isLoading} />
      )}
      {mobilePage === MobilePage.TRANSACTIONS && (
        <Transactions
          transactions={accountTransactions}
          isLoading={isLoading}
          onDelete={onDeleteTransaction}
        />
      )}
      {mobilePage === MobilePage.SUMMARY && (
        <Summary isLoading={isLoading} account={account} />
      )}
      <BottomNavigation
        showLabels
        value={mobilePage}
        onChange={(_event, newValue) => setMobilePage(newValue)}
      >
        <BottomNavigationAction label="Assets" icon={<Timeline />} />
        <BottomNavigationAction
          label="Transactions"
          icon={<FormatListNumbered />}
        />
        <BottomNavigationAction label="Summary" icon={<Equalizer />} />
      </BottomNavigation>
      <AccountDetailsDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={onConfirmDialog}
        type={dialogType}
      />
      {fabs.map((fab) => (
        <Zoom
          key={fab.value}
          in={mobilePage === fab.value}
          unmountOnExit
          timeout={200}
          style={{
            transitionDelay: `${mobilePage === fab.value ? 200 : 0}ms`,
          }}
        >
          <Fab
            key={fab.value}
            color="primary"
            sx={{ position: "fixed", bottom: 68, right: 24 }}
            onClick={fab.onClick}
          >
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
};
