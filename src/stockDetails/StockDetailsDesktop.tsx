import { useStockDetails } from "./use-stock-details.ts";
import { Loading } from "../util/Loading.tsx";
import { Container, Paper } from "@mui/material";
import { AssetSummary } from "./AssetSummary.tsx";
import { AssetTransactionsDesktop } from "./AssetTransactionsDesktop.tsx";
import { AssetTransactionDialog } from "./AssetTransactionDialog.tsx";

export const StockDetailsDesktop = () => {
  const {
    stock,
    assetTransactions,
    isLoading,
    dialogOpen,
    openDialog,
    closeDialog,
    onConfirmStockDialog,
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
          <AssetTransactionsDesktop
            asset={stock}
            transactions={assetTransactions}
            isLoading={isLoading}
            onAddTransactionClick={openDialog}
          />
        </Paper>
        <Paper
          elevation={4}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <AssetSummary isLoading={isLoading} stock={stock} />
        </Paper>
      </Container>
      <AssetTransactionDialog
        isOpen={dialogOpen}
        onClose={closeDialog}
        onConfirm={onConfirmStockDialog}
      />
    </>
  );
};
