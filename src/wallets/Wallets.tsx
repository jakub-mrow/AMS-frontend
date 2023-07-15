import { Container } from "@mui/material";
import { WalletsTable } from "./WalletsTable";
import { useWallets } from "./use-wallets";

export const Wallets = () => {
  const { wallets } = useWallets();
  return (
    <Container maxWidth="md">
      <WalletsTable wallets={wallets} />
    </Container>
  );
};
