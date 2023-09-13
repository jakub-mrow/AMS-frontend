import { Account } from "../accounts/types.ts";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";

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
        <VerticalFlexContainer
          fullHeight
          maxWidth="md"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h3">{account.name}</Typography>
          <Divider />
          <Typography variant="h4">Balances</Typography>
          {account.balances.map((balance) => (
            <Typography variant="h5" key={balance.currency}>
              {balance.currency} {balance.amount}
            </Typography>
          ))}
          <Divider />
        </VerticalFlexContainer>
      )}
    </>
  );
};
