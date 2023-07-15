import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Wallet } from "./use-wallets";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

export const WalletsTable = ({ wallets }: { wallets: Wallet[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Wallet</TableCell>
            <TableCell>Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wallets.map((wallet) => (
            <TableRow key={wallet.id} hover onClick={() => {}}>
              <TableCell>{wallet.id}</TableCell>
              <TableCell>{wallet.currency}</TableCell>
              <TouchRipple center={false} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
