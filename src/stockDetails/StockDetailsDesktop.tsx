import { useStockDetails } from "./use-stock-details.ts";
import { Loading } from "../util/Loading.tsx";
import { Box, Container, Paper } from "@mui/material";
import { AssetSummary } from "./AssetSummary.tsx";
import { AssetTransactionsDesktop } from "./AssetTransactionsDesktop.tsx";
import { AssetTransactionDialog } from "./AssetTransactionDialog.tsx";
import { AssetChart } from "./AssetChart.tsx";

export const StockDetailsDesktop = () => {
  const {
    stock,
    assetTransactions,
    assetBalanceHistories,
    assetTransactionToEdit,
    isLoading,
    baseStockValue,
    dialogOpen,
    openDialog,
    openEditDialog,
    closeDialog,
    onConfirmStockDialog,
    onDeleteTransaction,
  } = useStockDetails();

  if (!stock || !baseStockValue) {
    return <Loading />;
  }

  return (
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
        <Paper
          elevation={0}
          className="shadow-xl border rounded-xl mt-2"
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <AssetTransactionsDesktop
            asset={stock}
            transactions={assetTransactions}
            isLoading={isLoading}
            onAddTransactionClick={openDialog}
            onTransactionClick={openEditDialog}
          />
        </Paper>
        <Paper
          elevation={0}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <AssetSummary
            isLoading={isLoading}
            stock={stock}
            histories={assetBalanceHistories}
            baseStockValue={baseStockValue}
            isMobile={false}
          />
        </Paper>
      </Box>
      <Box sx={{ flex: 1, display: "flex", minHeight: 0 }}>
        <Paper
          className="shadow-xl border rounded-xl"
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <AssetChart
            isLoading={isLoading}
            histories={assetBalanceHistories}
            stockCurrency={stock.currency}
            isMobile={false}
          />
        </Paper>
      </Box>
      <AssetTransactionDialog
        isOpen={dialogOpen}
        type={stock.type}
        onClose={closeDialog}
        onConfirm={onConfirmStockDialog}
        onDelete={onDeleteTransaction}
        transactionToEdit={assetTransactionToEdit}
      />
    </Container>
  );
};
