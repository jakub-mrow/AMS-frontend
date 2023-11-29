import { Account } from "../types.ts";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";
import { Settings } from "@mui/icons-material";
import { displayCurrency } from "../util/display-currency.ts";

export const Summary = ({
  account,
  isLoading,
  showOpenAccountEditDialog,
  openAccountEditDialog,
}: {
  isLoading: boolean;
  account: Account;
  showOpenAccountEditDialog: boolean;
  openAccountEditDialog: () => void;
}) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <VerticalFlexContainer
          fullHeight
          maxWidth="md"
          sx={{
            textAlign: "center",
            mt: 2,
          }}
        >
          {showOpenAccountEditDialog && (
            <IconButton
              sx={{ alignSelf: "flex-end" }}
              onClick={openAccountEditDialog}
            >
              <Settings />
            </IconButton>
          )}
          <Typography variant="h3">{account.name}</Typography>
          <Divider />
          <Typography variant="h4">Value</Typography>
          {account.hasXirr() ? (
            <Box display="flex" justifyContent="center">
              <Typography variant="h5">{account.displayValue()}</Typography>
              <Typography
                variant="subtitle1"
                alignSelf="flex-end"
                sx={{ ml: 1 }}
                color={account.getXirrColor()}
              >
                {account.displayXirr()}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h5">{account.displayValue()}</Typography>
          )}
          <Divider />
          <Typography variant="h4">Balances</Typography>
          {account.balances.map((balance) => (
            <Typography variant="h5" key={balance.currency}>
              {displayCurrency(balance.amount, balance.currency)}
            </Typography>
          ))}
          <Divider />
        </VerticalFlexContainer>
      )}
    </>
  );
};
