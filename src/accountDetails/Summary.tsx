import { Account } from "../types.ts";
import { Divider, IconButton, Typography } from "@mui/material";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";
import { Settings } from "@mui/icons-material";

export const Summary = ({
  account,
  isLoading,
  showOpenAccountPreferencesDialog,
  openAccountPreferencesDialog,
}: {
  isLoading: boolean;
  account: Account;
  showOpenAccountPreferencesDialog: boolean;
  openAccountPreferencesDialog: () => void;
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
          {showOpenAccountPreferencesDialog && (
            <IconButton
              sx={{ alignSelf: "flex-end" }}
              onClick={openAccountPreferencesDialog}
            >
              <Settings />
            </IconButton>
          )}
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
