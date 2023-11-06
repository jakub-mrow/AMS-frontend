import { TransactionsList } from "./TransactionsList.tsx";
import { AccountTransaction } from "../types.ts";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog.tsx";
import { useState } from "react";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";

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
      {isLoading ? (
        <Loading />
      ) : (
        <VerticalFlexContainer
          fullHeight
          maxWidth="md"
          sx={{
            minHeight: 0,
          }}
        >
          <TransactionsList
            transactions={transactions}
            onDeleteClick={onDeleteClick}
          />
        </VerticalFlexContainer>
      )}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onDeleteConfirm}
        content={`Are you sure you want to delete ${transactionToDelete?.type} transaction from ${transactionToDelete?.date.toLocaleDateString()}?`}
      />
    </>
  );
};
