import {
  AccountTransaction,
  AccountTransactionType,
} from "../accounts/types.ts";
import { Box, Divider, ListItem, ListItemText } from "@mui/material";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";

const getName = (type: AccountTransactionType) => {
  switch (type) {
    case AccountTransactionType.DEPOSIT:
      return "Deposit";
    case AccountTransactionType.WITHDRAWAL:
      return "Withdrawal";
    default:
      return exhaustiveGuard(type);
  }
};

const getSign = (type: AccountTransactionType) => {
  switch (type) {
    case AccountTransactionType.DEPOSIT:
      return "+";
    case AccountTransactionType.WITHDRAWAL:
      return "-";
    default:
      return exhaustiveGuard(type);
  }
};

const getColor = (type: AccountTransactionType) => {
  switch (type) {
    case AccountTransactionType.DEPOSIT:
      return "green";
    case AccountTransactionType.WITHDRAWAL:
      return "red";
    default:
      return exhaustiveGuard(type);
  }
};

export const TransactionsListItem = ({
  transaction,
}: {
  transaction: AccountTransaction;
}) => (
  <>
    <ListItem>
      <ListItemText>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ListItemText primary={getName(transaction.type)} />
          <ListItemText
            primary={`${getSign(transaction.type)}${transaction.amount} ${
              transaction.currency
            }`}
            primaryTypographyProps={{
              align: "right",
              color: getColor(transaction.type),
            }}
            secondary={transaction.date.toLocaleDateString()}
            secondaryTypographyProps={{ align: "right" }}
          />
        </Box>
      </ListItemText>
    </ListItem>
    <Divider />
  </>
);
