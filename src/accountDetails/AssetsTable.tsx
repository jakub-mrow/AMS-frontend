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
import { Asset } from "../types.ts";
import { displayCurrency } from "../util/display-currency.ts";

export const AssetsTable = ({
  assets,
  goToAsset,
}: {
  assets: Asset[];
  goToAsset: (isin: string) => void;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const getTableHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Exchange</TableCell>
        <TableCell>Value</TableCell>
        <TableCell>Result</TableCell>
      </TableRow>
    </TableHead>
  );

  const getTableRow = (asset: Asset) => (
    <TableRow key={asset.isin} hover onClick={() => goToAsset(asset.isin)}>
      <TableCell>{asset.name}</TableCell>
      <TableCell>{asset.exchange}</TableCell>
      <TableCell>
        {displayCurrency(asset.price * asset.quantity, asset.currency)}
      </TableCell>
      <TableCell
        sx={{
          color: asset.getResultColor(),
        }}
      >
        {`${asset.result}%`}
      </TableCell>
    </TableRow>
  );

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
