import { AccountTransaction } from "../types.ts";
import { Box, Divider, ListItem, ListItemText } from "@mui/material";
import { displayCurrency } from "../util/display-currency.ts";

export const TransactionsListItem = ({
  transaction,
  onTransactionClick,
}: {
  transaction: AccountTransaction;
  onTransactionClick: (accountTransaction: AccountTransaction) => void;
}) => (
  <>
    <ListItem onClick={() => onTransactionClick(transaction)}>
      <ListItemText>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ListItemText primary={transaction.getName()} />
          <ListItemText
            primary={`${transaction.getSign()} ${displayCurrency(
              transaction.amount,
              transaction.currency,
            )}`}
            primaryTypographyProps={{
              align: "right",
              color: transaction.getColor(),
            }}
            secondary={transaction.date.toLocaleDateString()}
            secondaryTypographyProps={{ align: "right" }}
            sx={{ mr: 2 }}
          />
        </Box>
      </ListItemText>
    </ListItem>
    <Divider />
  </>
);
