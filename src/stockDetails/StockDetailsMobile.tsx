import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Zoom,
} from "@mui/material";
import { DialogType, useStockDetails } from "./use-stock-details.ts";
import { useState } from "react";
import { Add, Equalizer, FormatListNumbered } from "@mui/icons-material";
import { AssetTransactionsMobile } from "./AssetTransactionsMobile.tsx";
import { AssetSummary } from "./AssetSummary.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { Loading } from "../util/Loading.tsx";
import { StocksDialog } from "./StocksDialog.tsx";

enum MobilePage {
  TRANSACTIONS,
  SUMMARY,
}

export const StockDetailsMobile = () => {
  const {
    stock,
    assetTransactions,
    isLoading,
    isDialogOpen,
    openDialog,
    closeDialog,
    onConfirmStockDialog,
  } = useStockDetails();

  const [mobilePage, setMobilePage] = useState(MobilePage.TRANSACTIONS);

  if (!stock) {
    return <Loading />;
  }

  return (
    <VerticalFlexBox fullHeight sx={{ minHeight: 0 }}>
      {mobilePage === MobilePage.TRANSACTIONS && (
        <AssetTransactionsMobile
          asset={stock}
          transactions={assetTransactions}
          isLoading={isLoading}
        />
      )}
      {mobilePage === MobilePage.SUMMARY && (
        <AssetSummary isLoading={isLoading} stock={stock} />
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
