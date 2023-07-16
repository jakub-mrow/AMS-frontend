import { Button, Container } from "@mui/material";
import { AccountsTable } from "./AccountsTable.tsx";
import { useAccounts } from "./use-accounts.ts";
import { AddAccountDialog } from "./AddAccountDialog.tsx";
import { UpdateAccountDialog } from "./UpdateAccountDialog.tsx";

export const Accounts = () => {
  const {
    accounts,
    openAddDialog,
    closeAddDialog,
    isAddDialogOpen,
    openUpdateDialog,
    closeUpdateDialog,
    updateDialogData,
    addAccount,
    removeAccount,
    updateAccount,
    goToAccount,
  } = useAccounts();
  return (
    <Container maxWidth="md">
      <AccountsTable
        accounts={accounts}
        onAccountDelete={removeAccount}
        onAccountUpdate={openUpdateDialog}
        goToAccount={goToAccount}
      />
      <Button variant="contained" onClick={openAddDialog}>
        Create account
      </Button>
      <AddAccountDialog
        isOpen={isAddDialogOpen}
        onClose={closeAddDialog}
        onAdd={addAccount}
      />
      <UpdateAccountDialog
        isOpen={updateDialogData.isOpen}
        onClose={closeUpdateDialog}
        onUpdate={updateAccount}
        accountToUpdate={updateDialogData.account}
      />
    </Container>
  );
};
