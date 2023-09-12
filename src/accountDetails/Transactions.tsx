import { Box, CircularProgress, Container } from "@mui/material";
import { TransactionsList } from "./TransactionsList.tsx";
import { AccountTransaction } from "../accounts/types.ts";

export const Transactions = ({
  transactions,
  isLoading,
}: {
  transactions: AccountTransaction[];
  isLoading: boolean;
}) => {
  return (
    <Container maxWidth="md" sx={{ mb: "56px" }}>
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TransactionsList transactions={transactions} />
        </>
      )}
    </Container>
  );
};
