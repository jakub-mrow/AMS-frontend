import { useAccountDetails } from "./use-account-details.ts";
import { Loading } from "./Loading.tsx";
import { AccountDetailsDialog } from "./AccountDetailsDialog.tsx";
import { Container, Paper } from "@mui/material";
import { Summary } from "./Summary.tsx";

export const AccountDetailsDesktop = () => {
  const {
    account,
    // accountTransactions,
    // assets,
    isLoading,
    isDialogOpen,
    // openDialog,
    closeDialog,
    onConfirmDialog,
    dialogType,
    // onDeleteTransaction,
  } = useAccountDetails();

  if (!account) {
    return <Loading />;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ flex: 1, display: "flex", my: 4, gap: 2 }}>
        <Paper
          elevation={4}
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>data</div>
        </Paper>
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
