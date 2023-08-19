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
import { AccountTransaction } from "../accounts/types.ts";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";

export const AccountsTransactionsTable = ({
  accountTransactions,
  onDeleteTransaction,
}: {
  accountTransactions: AccountTransaction[];
  onDeleteTransaction: (accountTransaction: AccountTransaction) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<AccountTransaction | null>(null);
  const onDeleteConfirm = () => {
    if (transactionToDelete) {
      onDeleteTransaction(transactionToDelete);
    }
    setIsDialogOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountTransactions.map((accountTransaction) => (
              <TableRow key={accountTransaction.id} hover>
                <TableCell>{accountTransaction.id}</TableCell>
                <TableCell>{accountTransaction.type}</TableCell>
                <TableCell>{accountTransaction.amount}</TableCell>
                <TableCell>{accountTransaction.currency}</TableCell>
                <TableCell>
                  {accountTransaction.date.toLocaleString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setIsDialogOpen(true);
                      setTransactionToDelete(accountTransaction);
                    }}
                  >
                    <Delete />
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
        content={`Are you sure you want to delete ${transactionToDelete?.type} transaction from ${transactionToDelete?.date.toLocaleDateString()}?`}
      />
    </>
  );
};
