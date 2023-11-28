import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Zoom,
} from "@mui/material";
import { useStockDetails } from "./use-stock-details.ts";
import { useState } from "react";
import { Add, Equalizer, FormatListNumbered } from "@mui/icons-material";
import { AssetTransactionsMobile } from "./AssetTransactionsMobile.tsx";
import { AssetSummary } from "./AssetSummary.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { Loading } from "../util/Loading.tsx";
import { AssetTransactionDialog } from "./AssetTransactionDialog.tsx";

enum MobilePage {
  TRANSACTIONS,
  SUMMARY,
}

export const StockDetailsMobile = () => {
  const {
    stock,
    assetTransactions,
    assetBalanceHistories,
    baseStockValue,
    assetTransactionToEdit,
    isLoading,
    dialogOpen,
    openDialog,
    closeDialog,
    openEditDialog,
    onDeleteTransaction,
    onConfirmStockDialog,
  } = useStockDetails();

  const [mobilePage, setMobilePage] = useState(MobilePage.TRANSACTIONS);

  if (!stock || !baseStockValue) {
    return <Loading />;
  }

  return (
    <VerticalFlexBox fullHeight sx={{ minHeight: 0 }}>
      {mobilePage === MobilePage.TRANSACTIONS && (
        <AssetTransactionsMobile
          asset={stock}
          transactions={assetTransactions}
          isLoading={isLoading}
          onClickTransaction={openEditDialog}
        />
      )}
      {mobilePage === MobilePage.SUMMARY && (
        <AssetSummary
          isLoading={isLoading}
          stock={stock}
          histories={assetBalanceHistories}
          baseStockValue={baseStockValue}
          isMobile={true}
        />
      )}
      <BottomNavigation
        showLabels
        value={mobilePage}
        onChange={(_event, newValue) => setMobilePage(newValue)}
      >
        <BottomNavigationAction
          label="Transactions"
          icon={<FormatListNumbered />}
        />
        <BottomNavigationAction label="Summary" icon={<Equalizer />} />
      </BottomNavigation>
      <AssetTransactionDialog
        isOpen={dialogOpen}
        onClose={closeDialog}
        onConfirm={onConfirmStockDialog}
        onDelete={onDeleteTransaction}
        transactionToEdit={assetTransactionToEdit}
      />
      <Zoom in={mobilePage === MobilePage.TRANSACTIONS} unmountOnExit>
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 68, right: 24 }}
          onClick={openDialog}
        >
          <Add />
        </Fab>
      </Zoom>
    </VerticalFlexBox>
  );
};
