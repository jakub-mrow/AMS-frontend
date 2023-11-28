import { Asset, AssetTransaction } from "../types.ts";
import { List, Typography } from "@mui/material";
import { AssetTransactionsListItem } from "./AssetTransactionsListItem.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";

export const AssetTransactionsList = ({
  asset,
  transactions,
  onClickTransaction,
}: {
  asset: Asset;
  transactions: AssetTransaction[];
  onClickTransaction: (assetTransaction: AssetTransaction) => void;
}) => {
  if (transactions.length === 0) {
    return (
      <VerticalFlexBox
        fullHeight
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography align="center" variant="h3">
          You don't have any transactions yet
        </Typography>
      </VerticalFlexBox>
    );
  }
  return (
    <List sx={{ flex: 1, overflowY: "auto" }}>
      {transactions.map((transaction) => (
        <AssetTransactionsListItem
          key={transaction.id}
          asset={asset}
          transaction={transaction}
          onTransactionClick={onClickTransaction}
        />
      ))}
    </List>
  );
};
