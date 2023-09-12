import { AccountTransaction } from "../accounts/types.ts";
import { Box, List, Typography } from "@mui/material";
import { TransactionsListItem } from "./TransactionsListItem.tsx";

export const TransactionsList = ({
  transactions,
  onDeleteClick,
}: {
  transactions: AccountTransaction[];
  onDeleteClick: (transaction: AccountTransaction) => void;
}) => {
  if (transactions.length === 0) {
    return (
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography align="center" variant="h3">
          You don't have any transactions yet
        </Typography>
      </Box>
    );
  }
  return (
    <List>
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
