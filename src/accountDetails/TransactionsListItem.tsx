import { AccountTransaction } from "../types.ts";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { displayCurrency } from "../util/display-currency.ts";

export const TransactionsListItem = ({
  transaction,
  onDeleteClick,
}: {
  transaction: AccountTransaction;
  onDeleteClick: (transaction: AccountTransaction) => void;
}) => (
  <>
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => onDeleteClick(transaction)}>
          <Delete />
        </IconButton>
      }
    >
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
