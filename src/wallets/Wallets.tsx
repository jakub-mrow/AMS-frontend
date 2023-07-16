import { Button, Container } from "@mui/material";
import { WalletsTable } from "./WalletsTable";
import { useWallets } from "./use-wallets";
import { AddWalletDialog } from "./AddWalletDialog";
import { UpdateWalletDialog } from "./UpdateWalletDialog";

export const Wallets = () => {
  const {
    wallets,
    openAddDialog,
    closeAddDialog,
    isAddDialogOpen,
    openUpdateDialog,
    closeUpdateDialog,
    updateDialogData,
    addWallet,
    removeWallet,
    updateWallet,
  } = useWallets();
  return (
    <Container maxWidth="md">
      <WalletsTable
        wallets={wallets}
        onWalletDelete={removeWallet}
        onWalletUpdate={openUpdateDialog}
      />
      <Button variant="contained" onClick={openAddDialog}>
        Create wallet
      </Button>
      <AddWalletDialog
        isOpen={isAddDialogOpen}
        onClose={closeAddDialog}
        onAdd={addWallet}
      />
      <UpdateWalletDialog
        isOpen={updateDialogData.isOpen}
        onClose={closeUpdateDialog}
        onUpdate={updateWallet}
        walletToUpdate={updateDialogData.wallet}
      />
    </Container>
  );
};
