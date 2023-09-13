import { Account } from "../accounts/types.ts";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

export const Summary = ({
  account,
  isLoading,
}: {
  isLoading: boolean;
  account: Account;
}) => {
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h3">{account.name}</Typography>
          <Divider />
          <Typography variant="h4">Balances</Typography>
          {account.balances.map((balance) => (
            <Typography variant="h5" key={balance.currency}>
              {balance.currency} {balance.amount}
            </Typography>
          ))}
          <Divider />
        </Box>
      )}
    </>
  );
};
