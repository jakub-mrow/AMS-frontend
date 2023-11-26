import { TransactionsList } from "./TransactionsList.tsx";
import { AccountTransaction } from "../types.ts";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";

export const Transactions = ({
  transactions,
  onTransactionClick,
  isLoading,
}: {
  transactions: AccountTransaction[];
  onTransactionClick: (accountTransaction: AccountTransaction) => void;
  isLoading: boolean;
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
            minHeight: 0,
          }}
        >
          <TransactionsList
            transactions={transactions}
            onTransactionClick={onTransactionClick}
          />
        </VerticalFlexContainer>
      )}
    </>
  );
};
