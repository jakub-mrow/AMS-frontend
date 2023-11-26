import { Asset, AssetTransaction } from "../types.ts";
import { Box, Divider, ListItem, ListItemText } from "@mui/material";
import { displayCurrency } from "../util/display-currency.ts";

export const AssetTransactionsListItem = ({
  asset,
  transaction,
}: {
  asset: Asset;
  transaction: AssetTransaction;
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
          <ListItemText
            primary={transaction.getName()}
            primaryTypographyProps={{
              align: "left",
            }}
            secondary={transaction.date.toLocaleDateString()}
            secondaryTypographyProps={{ align: "left" }}
            sx={{ mr: 2 }}
          />
          <ListItemText
            primary={`${transaction.getSign()} ${displayCurrency(
              transaction.price * transaction.quantity,
              asset.currency,
            )}`}
            primaryTypographyProps={{
              align: "right",
              color: transaction.getColor(),
            }}
            secondary={`${transaction.quantity} x ${displayCurrency(
              transaction.price,
              asset.currency,
            )}`}
            secondaryTypographyProps={{ align: "right" }}
            sx={{ mr: 2 }}
          />
        </Box>
      </ListItemText>
    </ListItem>
    <Divider />
  </>
);
