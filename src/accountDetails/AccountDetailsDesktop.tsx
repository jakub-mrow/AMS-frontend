import { DialogType, useAccountDetails } from "./use-account-details.ts";
import { Loading } from "./Loading.tsx";
import { AccountDetailsDialog } from "./AccountDetailsDialog.tsx";
import { Box, Button, Container, Paper, Tab, Tabs } from "@mui/material";
import { Summary } from "./Summary.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";
import { useState } from "react";
import { AccountsTransactionsTable } from "./AccountTransactionsTable.tsx";

enum DetailsTabs {
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
    // assets,
    isLoading,
    isDialogOpen,
    openDialog,
    closeDialog,
    onConfirmDialog,
    dialogType,
    onDeleteTransaction,
  } = useAccountDetails();
  const [detailsTab, setDetailsTab] = useState(DetailsTabs.STOCKS);
  console.log(detailsTab);

  if (!account) {
    return <Loading />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ flex: 1, display: "flex", my: 4, gap: 2, minHeight: 0 }}
      >
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
            <Box flexGrow={1} />
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
              <>
                <Box display={"flex"} justifyContent={"flex-end"} m={2}>
                  <Button
                    variant={"contained"}
                    onClick={() => openDialog(DialogType.TRANSACTION)}
                  >
                    Add transaction
                  </Button>
                </Box>
                <AccountsTransactionsTable
                  transactions={accountTransactions}
                  onDeleteTransaction={onDeleteTransaction}
                  isLoading={isLoading}
                />
              </>
            ) : (
              <div>assets</div>
            )}
          </Paper>
        </VerticalFlexBox>
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
