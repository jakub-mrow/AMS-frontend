import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Account } from "./accounts-service.ts";

export const AccountsTable = ({
  accounts,
  onAccountDelete,
  onAccountUpdate,
}: {
  accounts: Account[];
  onAccountDelete: (accountId: number) => void;
  onAccountUpdate: (account: Account) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id} hover onClick={() => {}}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => onAccountDelete(account.id)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => onAccountUpdate(account)}>
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
