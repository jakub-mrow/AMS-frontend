import { Box, Button, Typography } from "@mui/material";
import { AccountsTransactionsTable } from "./AccountTransactionsTable.tsx";
import { Loading } from "../util/Loading.tsx";
import { AccountTransaction } from "../types.ts";
import { VerticalFlexBox } from "../util/VerticalFlexBox.tsx";

export const TransactionsDesktop = ({
  transactions,
  isLoading,
  onAddTransactionClick,
  onTransactionClick,
}: {
  transactions: AccountTransaction[];
  isLoading: boolean;
  onAddTransactionClick: () => void;
  onTransactionClick: (transaction: AccountTransaction) => void;
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
      <AccountsTransactionsTable
        transactions={transactions}
        onClickTransaction={onTransactionClick}
        isLoading={isLoading}
      />
    </>
  );
};
