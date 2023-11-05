import { Account } from "../accounts/types.ts";
import { Divider, Typography } from "@mui/material";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "./Loading.tsx";

export const Summary = ({
  stock,
  isLoading,
}: {
  isLoading: boolean;
  stock: Account;
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
          <Typography variant="h3">{stock.name}</Typography>
          <Divider />
          <Typography variant="h4">Balances</Typography>
          {stock.balances.map((balance) => (
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
