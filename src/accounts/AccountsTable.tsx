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
import { Account } from "./types.ts";
import { MouseEvent, useState } from "react";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";

export const AccountsTable = ({
  accounts,
  onAccountDelete,
  onAccountUpdate,
  goToAccount,
}: {
  accounts: Account[];
  onAccountDelete: (accountId: number) => void;
  onAccountUpdate: (account: Account) => void;
  goToAccount: (accountId: number) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const onDeleteConfirm = () => {
    if (accountToDelete) {
      onAccountDelete(accountToDelete.id);
    }
    setIsDialogOpen(false);
  };
  return (
    <>
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
              <TableRow
                key={account.id}
                hover
                onClick={() => goToAccount(account.id)}
              >
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                      ev.stopPropagation();
                      setAccountToDelete(account);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                      ev.stopPropagation();
                      onAccountUpdate(account);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onDeleteConfirm}
        content={`Are you sure you want to delete account ${accountToDelete?.name}?`}
      />
    </>
  );
};
