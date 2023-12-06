import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Loading } from "../util/Loading.tsx";
import { AccountTransaction, Asset, AssetTransaction } from "../types.ts";
import { displayCurrency } from "../util/display-currency.ts";

export const AssetTransactionsTable = ({
  asset,
  transactions,
  onClickTransaction,
  isLoading,
}: {
  asset: Asset;
  transactions: AssetTransaction[];
  onClickTransaction: (assetTransaction: AssetTransaction) => void;
  isLoading: boolean;
}) => {
  useState<AccountTransaction | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
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
              <TableRow
                key={transaction.id}
                hover
                onClick={() => onClickTransaction(transaction)}
              >
                <TableCell>{transaction.getName()}</TableCell>
                <TableCell>
                  {displayCurrency(
                    transaction.getPrice(),
                    transaction.payCurrency || asset.currency,
                  )}
                </TableCell>
                <TableCell>{transaction.getQuantity()}</TableCell>
                <TableCell
                  sx={{ color: transaction.getColor() }}
                >{`${transaction.getSign()} ${displayCurrency(
                  transaction.getValue(),
                  transaction.payCurrency || asset.currency,
                )}`}</TableCell>
                <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
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
    </>
  );
};
