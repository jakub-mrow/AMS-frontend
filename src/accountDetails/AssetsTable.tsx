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
import { Asset, getAssetResultColor } from "./assets-mock.ts";

export const AssetsTable = ({ assets }: { assets: Asset[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ flex: 1, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Exchange</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? assets.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                )
              : assets
            ).map((asset) => (
              <TableRow key={asset.isin} hover>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.exchange}</TableCell>
                <TableCell>{`${asset.total} ${asset.currency}`}</TableCell>
                <TableCell
                  sx={{
                    color: getAssetResultColor(asset),
                  }}
                >
                  {`${asset.result}%`}
                </TableCell>
              </TableRow>
            ))}
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
