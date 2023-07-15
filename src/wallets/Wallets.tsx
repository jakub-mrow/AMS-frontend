import { Button, Container } from "@mui/material";
import { WalletsTable } from "./WalletsTable";
import { useWallets } from "./use-wallets";
import { AddWalletDialog } from "./AddWalletDialog";

export const Wallets = () => {
  const { wallets, openAddDialog, closeAddDialog, isAddDialogOpen, addWallet } =
    useWallets();
  return (
    <Container maxWidth="md">
      <WalletsTable wallets={wallets} />
      <Button variant="contained" onClick={openAddDialog}>
        Create wallet
      </Button>
      <AddWalletDialog
        isOpen={isAddDialogOpen}
        onClose={closeAddDialog}
        onAdd={addWallet}
      />
    </Container>
  );
};
