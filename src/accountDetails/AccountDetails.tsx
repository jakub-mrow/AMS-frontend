import { Button, Container, LinearProgress } from "@mui/material";
import { useAccountDetails } from "./use-account-details";
import { AccountsTransactionsTable } from "./AccountTransactionsTable.tsx";
import { AccountTransactionDialog } from "./AccountTransactionDialog.tsx";

export const AccountDetails = () => {
  const {
    account,
    accountTransactions,
    openDepositDialog,
    openWithdrawalDialog,
    closeDialog,
    isDialogOpen,
    dialogType,
    onConfirmDialog,
  } = useAccountDetails();

  if (!account) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="md">
      Account id: {account.id}
      <br />
      Account name: {account.name}
      <br />
      Account balances:
      <br />
      {account.balances.map((balance) => (
        <div key={balance.currency}>
          {balance.currency}: {balance.amount}
        </div>
      ))}
      <AccountsTransactionsTable accountTransactions={accountTransactions} />
      <Button variant="contained" color="primary" onClick={openDepositDialog}>
        Deposit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={openWithdrawalDialog}
      >
        Withdraw
      </Button>
      <AccountTransactionDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={onConfirmDialog}
        type={dialogType}
      />
    </Container>
  );
};
