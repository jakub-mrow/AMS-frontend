import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Zoom,
} from "@mui/material";
import { DialogType, useAccountDetails } from "./use-account-details";
import { ReactElement, useState } from "react";
import {
  Add,
  CloudUpload,
  Equalizer,
  FormatListNumbered,
  Settings,
  Timeline,
} from "@mui/icons-material";
import { AssetsListWithTabs } from "./AssetsListWithTabs.tsx";
import { Transactions } from "./Transactions.tsx";
import { AccountTransactionDialog } from "./AccountTransactionDialog.tsx";
import { Summary } from "./Summary.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { Loading } from "../util/Loading.tsx";
import { AccountEditDialog } from "./AccountEditDialog.tsx";
import { ImportDialog } from "./ImportDialog.tsx";

enum MobilePage {
  ASSETS,
  TRANSACTIONS,
  SUMMARY,
}

type FabData = {
  value: MobilePage;
  icon: ReactElement;
  onClick: () => void;
};

export const AccountDetailsMobile = () => {
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

  const [mobilePage, setMobilePage] = useState(MobilePage.ASSETS);

  const fabs: FabData[] = [
    {
      value: MobilePage.ASSETS,
      icon: <Add />,
      onClick: () => openDialog(DialogType.STOCK),
    },
    {
      value: MobilePage.TRANSACTIONS,
      icon: <Add />,
      onClick: () => openDialog(DialogType.TRANSACTION),
    },
    {
      value: MobilePage.SUMMARY,
      icon: <Settings />,
      onClick: openAccountEditDialog,
    },
  ];

  if (!account) {
    return <Loading />;
  }

  return (
    <VerticalFlexBox fullHeight sx={{ minHeight: 0 }}>
      {mobilePage === MobilePage.ASSETS && (
        <AssetsListWithTabs
          stocks={stocks}
          bonds={bonds}
          deposits={deposits}
          cryptocurrencies={cryptocurrencies}
          exchanges={exchanges}
          isLoading={isLoading}
          goToAsset={goToAsset}
          isDialogOpen={isDialogOpen(DialogType.STOCK)}
          closeDialog={closeDialog}
          onConfirmStockDialog={onConfirmStockDialog}
        />
      )}
      {mobilePage === MobilePage.TRANSACTIONS && (
        <Transactions
          transactions={accountTransactions}
          onTransactionClick={openEditAccountTransactionDialog}
          isLoading={isLoading}
        />
      )}
      {mobilePage === MobilePage.SUMMARY && (
        <Summary
          isLoading={isLoading}
          account={account}
          isMobile={true}
          histories={accountHistory}
        />
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
      <AccountTransactionDialog
        isOpen={isDialogOpen(DialogType.TRANSACTION)}
        onClose={closeDialog}
        onConfirm={onConfirmAccountTransactionDialog}
        baseCurrency={account.preferences.baseCurrency}
        onDelete={onDeleteTransaction}
        transactionToEdit={accountTransactionToEdit}
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
      <Zoom
        in={mobilePage === MobilePage.SUMMARY}
        unmountOnExit
        timeout={200}
        style={{
          transitionDelay: `${mobilePage === MobilePage.SUMMARY ? 200 : 0}ms`,
        }}
      >
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 140, right: 28 }}
          onClick={() => openDialog(DialogType.IMPORT)}
          size="medium"
        >
          <CloudUpload />
        </Fab>
      </Zoom>
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
    </VerticalFlexBox>
  );
};
