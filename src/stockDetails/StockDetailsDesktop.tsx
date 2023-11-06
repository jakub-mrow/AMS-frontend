import { DialogType, useStockDetails } from "./use-stock-details.ts";
import { Loading } from "../util/Loading.tsx";
import { Container, Paper } from "@mui/material";
import { AssetSummary } from "./AssetSummary.tsx";
import { TransactionsDesktop } from "./TransactionsDesktop.tsx";
import { StocksDialog } from "./StocksDialog.tsx";

export const StockDetailsDesktop = () => {
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

  if (!stock) {
    return <Loading />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: "flex", my: 4, gap: 2, minHeight: 0 }}
      >
        <Paper
          elevation={4}
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <TransactionsDesktop
            transactions={stockTransactions}
            isLoading={isLoading}
            onAddTransactionClick={() => openDialog(DialogType.TRANSACTION)}
            onDeleteTransactionClick={onDeleteTransaction}
          />
        </Paper>
        <Paper
          elevation={4}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <AssetSummary isLoading={isLoading} stock={stock} />
        </Paper>
      </Container>
      <StocksDialog
        isOpen={isDialogOpen(DialogType.TRANSACTION)}
        onClose={closeDialog}
        onConfirm={onConfirmStockDialog}
      />
    </>
  );
};
