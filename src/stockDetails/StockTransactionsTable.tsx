import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";
import { Loading } from "../util/Loading.tsx";
import { getColor, getName, getSign } from "./transactions-util.ts";
import { AccountTransaction } from "../types.ts";
import { displayCurrency } from "../util/display-currency.ts";

export const StockTransactionsTable = ({
  transactions,
  onDeleteTransaction,
  isLoading,
}: {
  transactions: AccountTransaction[];
  onDeleteTransaction: (accountTransaction: AccountTransaction) => void;
  isLoading: boolean;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<AccountTransaction | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const onDeleteConfirm = () => {
    if (transactionToDelete) {
      onDeleteTransaction(transactionToDelete);
    }
    setIsDialogOpen(false);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ flex: 1, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? transactions.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
              : transactions
            ).map((transaction) => (
              <TableRow key={transaction.id} hover>
                <TableCell>{getName(transaction.type)}</TableCell>
                <TableCell
                  sx={{ color: getColor(transaction.type) }}
                >{`${getSign(transaction.type)} ${displayCurrency(
                  transaction.amount,
                  transaction.currency,
                )}`}</TableCell>
                <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setIsDialogOpen(true);
                      setTransactionToDelete(transaction);
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onDeleteConfirm}
        content={`Are you sure you want to delete ${transactionToDelete?.type} transaction from ${transactionToDelete?.date.toLocaleDateString()}?`}
      />
    </>
  );
};
