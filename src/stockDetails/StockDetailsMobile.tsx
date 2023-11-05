import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Zoom,
} from "@mui/material";
import { DialogType, useStockDetails } from "./use-stock-details.ts";
import { useState } from "react";
import { Add, Equalizer, FormatListNumbered } from "@mui/icons-material";
import { Transactions } from "./Transactions.tsx";
import { Summary } from "./Summary.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { Loading } from "./Loading.tsx";
import { StocksDialog } from "./StocksDialog.tsx";

enum MobilePage {
  TRANSACTIONS,
  SUMMARY,
}

export const StockDetailsMobile = () => {
  const {
    stock,
    stockTransactions,
    isLoading,
    isDialogOpen,
    openDialog,
    closeDialog,
    onConfirmStockDialog,
    onDeleteTransaction,
  } = useStockDetails();

  const [mobilePage, setMobilePage] = useState(MobilePage.TRANSACTIONS);

  if (!stock) {
    return <Loading />;
  }

  return (
    <VerticalFlexBox fullHeight sx={{ minHeight: 0 }}>
      {mobilePage === MobilePage.TRANSACTIONS && (
        <Transactions
          transactions={stockTransactions}
          isLoading={isLoading}
          onDelete={onDeleteTransaction}
        />
      )}
      {mobilePage === MobilePage.SUMMARY && (
        <Summary isLoading={isLoading} stock={stock} />
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
      <StocksDialog
        isOpen={isDialogOpen(DialogType.TRANSACTION)}
        onClose={closeDialog}
        onConfirm={onConfirmStockDialog}
      />
      <Zoom in={mobilePage === MobilePage.TRANSACTIONS} unmountOnExit>
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 68, right: 24 }}
          onClick={() => openDialog(DialogType.TRANSACTION)}
        >
          <Add />
        </Fab>
      </Zoom>
    </VerticalFlexBox>
  );
};
