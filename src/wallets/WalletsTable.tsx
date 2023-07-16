import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Wallet } from "./use-wallets";
import { Delete, Edit } from "@mui/icons-material";

export const WalletsTable = ({
  wallets,
  onWalletDelete,
  onWalletUpdate,
}: {
  wallets: Wallet[];
  onWalletDelete: (walletId: number) => void;
  onWalletUpdate: (wallet: Wallet) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Wallet</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wallets.map((wallet) => (
            <TableRow key={wallet.id} hover onClick={() => {}}>
              <TableCell>{wallet.id}</TableCell>
              <TableCell>{wallet.currency}</TableCell>
              <TableCell>
                <IconButton onClick={() => onWalletDelete(wallet.id)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => onWalletUpdate(wallet)}>
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
