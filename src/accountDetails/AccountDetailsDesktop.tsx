import { DialogType, useAccountDetails } from "./use-account-details.ts";
import { Loading } from "../util/Loading.tsx";
import { AccountTransactionDialog } from "./AccountTransactionDialog.tsx";
import { Box, Container, Paper, Tab, Tabs } from "@mui/material";
import { Summary } from "./Summary.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { useState } from "react";
import { TransactionsDesktop } from "./TransactionsDesktop.tsx";
import { AssetsDesktop } from "./AssetsDesktop.tsx";
import { AccountEditDialog } from "./AccountEditDialog.tsx";
import { Asset } from "../types.ts";
import { StocksDialog } from "./StocksDialog.tsx";
import { AccountChart } from "./AccountChart.tsx";

export enum DetailsTabs {
  STOCKS,
  BONDS,
  DEPOSITS,
  CRYPTO,
  EMPTY,
  TRANSACTIONS,
}

export const AccountDetailsDesktop = () => {
  const {
    account,
    accountTransactions,
    stocks,
    bonds,
    deposits,
    cryptocurrencies,
    accountPreferences,
    accountHistory,
    isLoading,
    isAccountHistoryLoading,
    isDialogOpen,
    openDialog,
    openEditAccountTransactionDialog,
    closeDialog,
    onConfirmAccountTransactionDialog,
    onConfirmStockDialog,
    onDeleteTransaction,
    accountTransactionToEdit,
    isAccountEditDialogOpen,
    openAccountEditDialog,
    closeAccountEditDialog,
    onConfirmEdit,
    deleteAccount,
    goToAsset,
  } = useAccountDetails();
  const [detailsTab, setDetailsTab] = useState(DetailsTabs.STOCKS);

  const getAssetsOfType = (type: DetailsTabs): Asset[] => {
    let assets: Asset[] = [];
    if (type === DetailsTabs.STOCKS) {
      assets = stocks;
    } else if (type === DetailsTabs.BONDS) {
      assets = bonds;
    } else if (type === DetailsTabs.DEPOSITS) {
      assets = deposits;
    } else if (type === DetailsTabs.CRYPTO) {
      assets = cryptocurrencies;
    }
    return assets.filter((asset) => asset.quantity > 0);
  };

  if (!account) {
    return <Loading />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          my: 4,
          gap: 2,
          minHeight: 0,
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 2, display: "flex", gap: 2, minHeight: 0 }}>
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
                  onAddTransactionClick={() =>
                    openDialog(DialogType.TRANSACTION)
                  }
                  onTransactionClick={openEditAccountTransactionDialog}
                />
              ) : (
                <AssetsDesktop
                  assets={getAssetsOfType(detailsTab)}
                  type={detailsTab}
                  isLoading={isLoading}
                  onAddAssetClick={() => openDialog(DialogType.STOCK)}
                  goToAsset={goToAsset}
                />
              )}
            </Paper>
          </VerticalFlexBox>
          <Paper
            elevation={4}
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Summary
              isLoading={isLoading}
              account={account}
              showOpenAccountEditDialog={true}
              openAccountEditDialog={openAccountEditDialog}
            />
          </Paper>
        </Box>
        <Box sx={{ flex: 1, display: "flex", minHeight: 0 }}>
          <Paper
            elevation={4}
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <AccountChart
              isLoading={isAccountHistoryLoading}
              histories={accountHistory}
              currency={accountPreferences.baseCurrency}
              isMobile={false}
            />
          </Paper>
        </Box>
      </Container>
      <AccountTransactionDialog
        isOpen={isDialogOpen(DialogType.TRANSACTION)}
        onClose={closeDialog}
        onConfirm={onConfirmAccountTransactionDialog}
        onDelete={onDeleteTransaction}
        baseCurrency={accountPreferences.baseCurrency}
        transactionToEdit={accountTransactionToEdit}
      />
      <StocksDialog
        stocks={stocks}
        isOpen={isDialogOpen(DialogType.STOCK)}
        onClose={closeDialog}
        onConfirm={onConfirmStockDialog}
      />
      <AccountEditDialog
        isOpen={isAccountEditDialogOpen}
        onClose={closeAccountEditDialog}
        onConfirm={onConfirmEdit}
        onDelete={deleteAccount}
        currentName={account.name}
        currentPreferences={accountPreferences}
      />
    </>
  );
};
