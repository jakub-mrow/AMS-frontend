import { DialogType, useAccountDetails } from "./use-account-details.ts";
import { Loading } from "./Loading.tsx";
import { AccountDetailsDialog } from "./AccountDetailsDialog.tsx";
import { Container, Paper, Tab, Tabs } from "@mui/material";
import { Summary } from "./Summary.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { useState } from "react";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";
import { AssetTypes } from "./assets-mock.ts";
import { TransactionsDesktop } from "./TransactionsDesktop.tsx";
import { AssetsDesktop } from "./AssetsDesktop.tsx";

enum DetailsTabs {
  STOCKS,
  BONDS,
  DEPOSITS,
  CRYPTO,
  EMPTY,
  TRANSACTIONS,
}

const toAssetsType = (tab: DetailsTabs) => {
  switch (tab) {
    case DetailsTabs.EMPTY:
    case DetailsTabs.TRANSACTIONS:
    case DetailsTabs.STOCKS:
      return AssetTypes.STOCKS;
    case DetailsTabs.BONDS:
      return AssetTypes.BONDS;
    case DetailsTabs.DEPOSITS:
      return AssetTypes.DEPOSITS;
    case DetailsTabs.CRYPTO:
      return AssetTypes.CRYPTO;
    default:
      exhaustiveGuard(tab);
  }
};

export const AccountDetailsDesktop = () => {
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
  const [detailsTab, setDetailsTab] = useState(DetailsTabs.STOCKS);

  if (!account) {
    return <Loading />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: "flex", my: 4, gap: 2, minHeight: 0 }}
      >
        <VerticalFlexBox flex={2}>
          <Tabs
            value={detailsTab}
            onChange={(_event, newValue) => setDetailsTab(newValue)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Stocks" />
            <Tab label="Bonds" />
            <Tab label="Deposits" />
            <Tab label="Crypto" />
            <Tab disabled />
            <Tab label="Transactions" />
          </Tabs>
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            {detailsTab === DetailsTabs.TRANSACTIONS ? (
              <TransactionsDesktop
                transactions={accountTransactions}
                isLoading={isLoading}
                onAddTransactionClick={() => openDialog(DialogType.TRANSACTION)}
                onDeleteTransactionClick={onDeleteTransaction}
              />
            ) : (
              <AssetsDesktop
                assets={assets}
                type={toAssetsType(detailsTab)}
                isLoading={isLoading}
                onAddAssetClick={() => openDialog(DialogType.TRANSACTION)}
              />
            )}
          </Paper>
        </VerticalFlexBox>
        <Paper
          elevation={4}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Summary isLoading={isLoading} account={account} />
        </Paper>
      </Container>
      <AccountDetailsDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={onConfirmDialog}
        type={dialogType}
      />
    </>
  );
};
