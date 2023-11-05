import { AccountTransaction } from "../accounts/types.ts";
import { List, Typography } from "@mui/material";
import { TransactionsListItem } from "./TransactionsListItem.tsx";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";

export const TransactionsList = ({
  transactions,
  onDeleteClick,
}: {
  transactions: AccountTransaction[];
  onDeleteClick: (transaction: AccountTransaction) => void;
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
        <TransactionsListItem
          key={transaction.id}
          transaction={transaction}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </List>
  );
};
