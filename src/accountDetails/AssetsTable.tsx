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
import { Asset, Bond, Cryptocurrency, Deposit, Stock } from "./types";

export const AssetsTable = ({ assets }: { assets: Asset[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const getTableHeader = () => {
    if (assets[0] instanceof Stock) {
      return (
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Exchange</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
      );
    } else {
      return (
        <TableHead>
          <TableRow>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
      );
    }
  };

  const getTableRow = (asset: Asset) => {
    if (asset instanceof Stock) {
      return (
        <TableRow key={asset.isin} hover>
          <TableCell>{asset.name}</TableCell>
          <TableCell>{asset.exchange}</TableCell>
          <TableCell>{`${asset.value} ${asset.currency}`}</TableCell>
          <TableCell
            sx={{
              color: asset.getResultColor(),
            }}
          >
            {`${asset.getResult()}%`}
          </TableCell>
        </TableRow>
      );
    } else if (asset instanceof Bond) {
      return (
        <TableRow key={asset.id} hover>
          <TableCell
            sx={{
              color: asset.getResultColor(),
            }}
          >
            {`${asset.result}%`}
          </TableCell>
        </TableRow>
      );
    } else if (asset instanceof Deposit) {
      return (
        <TableRow key={asset.id} hover>
          <TableCell
            sx={{
              color: asset.getResultColor(),
            }}
          >
            {`${asset.result}%`}
          </TableCell>
        </TableRow>
      );
    } else if (asset instanceof Cryptocurrency) {
      return (
        <TableRow key={asset.id} hover>
          <TableCell
            sx={{
              color: asset.getResultColor(),
            }}
          >
            {`${asset.result}%`}
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ flex: 1, overflowY: "auto" }}>
        <Table stickyHeader>
          {getTableHeader()}
          <TableBody>
            {(rowsPerPage > 0
              ? assets.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
              : assets
            ).map(getTableRow)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        count={assets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
