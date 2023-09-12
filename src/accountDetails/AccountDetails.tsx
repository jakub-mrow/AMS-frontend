import {
  BottomNavigation,
  BottomNavigationAction,
  LinearProgress,
} from "@mui/material";
import { useAccountDetails } from "./use-account-details";
import { useState } from "react";
import { Equalizer, FormatListNumbered, Timeline } from "@mui/icons-material";
import { Assets } from "./Assets.tsx";
import { Transactions } from "./Transactions.tsx";

enum MobilePage {
  ASSETS,
  TRANSACTIONS,
  SUMMARY,
}

export const AccountDetails = () => {
  const { account, accountTransactions, assets, isLoading } =
    useAccountDetails();

  const [mobilePage, setMobilePage] = useState(MobilePage.ASSETS);

  if (!account) {
    return <LinearProgress />;
  }

  return (
    <>
      {mobilePage === MobilePage.ASSETS && (
        <Assets assets={assets} isLoading={isLoading} />
      )}
      {mobilePage === MobilePage.TRANSACTIONS && (
        <Transactions
          transactions={accountTransactions}
          isLoading={isLoading}
        />
      )}
      {mobilePage === MobilePage.SUMMARY && <div>Summary</div>}
      <BottomNavigation
        showLabels
        value={mobilePage}
        onChange={(_event, newValue) => setMobilePage(newValue)}
        sx={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <BottomNavigationAction label="Assets" icon={<Timeline />} />
        <BottomNavigationAction
          label="Transactions"
          icon={<FormatListNumbered />}
        />
        <BottomNavigationAction label="Summary" icon={<Equalizer />} />
      </BottomNavigation>
    </>
  );
};
