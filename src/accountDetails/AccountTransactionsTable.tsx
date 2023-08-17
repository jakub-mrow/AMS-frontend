import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AccountTransaction } from "../accounts/types.ts";

export const AccountsTransactionsTable = ({
  accountTransactions,
}: {
  accountTransactions: AccountTransaction[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountTransactions.map((accountTransaction) => (
            <TableRow key={accountTransaction.id} hover>
              <TableCell>{accountTransaction.id}</TableCell>
              <TableCell>{accountTransaction.type}</TableCell>
              <TableCell>{accountTransaction.amount}</TableCell>
              <TableCell>{accountTransaction.currency}</TableCell>
              <TableCell>{accountTransaction.date.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
