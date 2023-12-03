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
import { Asset, AssetType } from "../types.ts";
import { StocksDialog } from "./StocksDialog.tsx";
import { AccountChart } from "./AccountChart.tsx";
import { ImportDialog } from "./ImportDialog.tsx";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";

enum DetailsTabs {
  STOCKS,
  BONDS,
  DEPOSITS,
  CRYPTO,
  EMPTY,
  TRANSACTIONS,
}

const detailsTabToAssetType = (tab: DetailsTabs): AssetType => {
  if (tab === DetailsTabs.STOCKS) {
    return AssetType.STOCK;
  } else if (tab === DetailsTabs.BONDS) {
    return AssetType.BOND;
  } else if (tab === DetailsTabs.DEPOSITS) {
    return AssetType.DEPOSIT;
  } else if (tab === DetailsTabs.CRYPTO) {
    return AssetType.CRYPTO;
  }
  return AssetType.STOCK;
};

export const AccountDetailsDesktop = () => {
  const {
    account,
    accountTransactions,
    stocks,
    bonds,
    deposits,
    cryptocurrencies,
    accountHistory,
    exchanges,
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
    onSendCsvFile,
    onSendBrokerFile,
  } = useAccountDetails();
  const [detailsTab, setDetailsTab] = useState(DetailsTabs.STOCKS);

  const getAssetsOfType = (type: AssetType): Asset[] => {
    let assets: Asset[] = [];
    switch (type) {
      case AssetType.STOCK:
        assets = stocks;
        break;
      case AssetType.BOND:
        assets = bonds;
        break;
      case AssetType.DEPOSIT:
        assets = deposits;
        break;
      case AssetType.CRYPTO:
        assets = cryptocurrencies;
        break;
      default:
        exhaustiveGuard(type);
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
                  assets={getAssetsOfType(detailsTabToAssetType(detailsTab))}
                  type={detailsTabToAssetType(detailsTab)}
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
              openAccountEditDialog={openAccountEditDialog}
              openImportDialog={() => openDialog(DialogType.IMPORT)}
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
              currency={account.preferences.baseCurrency}
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
        baseCurrency={account.preferences.baseCurrency}
        transactionToEdit={accountTransactionToEdit}
      />
      <StocksDialog
        stocks={stocks}
        exchanges={exchanges}
        isOpen={isDialogOpen(DialogType.STOCK)}
        onClose={closeDialog}
        onConfirm={onConfirmStockDialog}
      />
      <AccountEditDialog
        account={account}
        isOpen={isAccountEditDialogOpen}
        onClose={closeAccountEditDialog}
        onConfirm={onConfirmEdit}
        onDelete={deleteAccount}
      />
      <ImportDialog
        isOpen={isDialogOpen(DialogType.IMPORT)}
        onClose={closeDialog}
        onSendImport={onSendCsvFile}
        onSendBrokerFile={onSendBrokerFile}
      />
    </>
  );
};
