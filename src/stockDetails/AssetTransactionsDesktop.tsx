import { Box, Button, Typography } from "@mui/material";
import { AssetTransactionsTable } from "./AssetTransactionsTable.tsx";
import { Loading } from "../util/Loading.tsx";
import { Asset, AssetTransaction } from "../types.ts";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";

export const AssetTransactionsDesktop = ({
  asset,
  transactions,
  isLoading,
  onAddTransactionClick,
  onTransactionClick,
}: {
  asset: Asset;
  transactions: AssetTransaction[];
  isLoading: boolean;
  onAddTransactionClick: () => void;
  onTransactionClick: (assetTransaction: AssetTransaction) => void;
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (transactions.length === 0) {
    return (
      <VerticalFlexBox
        fullHeight
        sx={{
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mx: 8,
        }}
      >
        <Typography align="center" variant="h5">
          You don't have any transactions yet
        </Typography>
        <Button variant={"contained"} onClick={onAddTransactionClick}>
          Add transaction
        </Button>
      </VerticalFlexBox>
    );
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"flex-end"} m={2}>
        <Button variant={"contained"} onClick={onAddTransactionClick}>
          Add transaction
        </Button>
      </Box>
      <AssetTransactionsTable
        asset={asset}
        transactions={transactions}
        isLoading={isLoading}
        onClickTransaction={onTransactionClick}
      />
    </>
  );
};
