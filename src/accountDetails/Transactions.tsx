import { Box, CircularProgress, Container } from "@mui/material";
import { TransactionsList } from "./TransactionsList.tsx";
import { AccountTransaction } from "../accounts/types.ts";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";
import { useState } from "react";

export const Transactions = ({
  transactions,
  isLoading,
  onDelete,
}: {
  transactions: AccountTransaction[];
  isLoading: boolean;
  onDelete: (transaction: AccountTransaction) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<AccountTransaction | null>(null);
  const onDeleteConfirm = () => {
    if (transactionToDelete) {
      onDelete(transactionToDelete);
    }
    setIsDialogOpen(false);
  };

  const onDeleteClick = (transaction: AccountTransaction) => {
    setTransactionToDelete(transaction);
    setIsDialogOpen(true);
  };
  return (
    <>
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
            <TransactionsList
              transactions={transactions}
              onDeleteClick={onDeleteClick}
            />
          </>
        )}
      </Container>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onDeleteConfirm}
        content={`Are you sure you want to delete ${transactionToDelete?.type} transaction from ${transactionToDelete?.date.toLocaleDateString()}?`}
      />
    </>
  );
};
