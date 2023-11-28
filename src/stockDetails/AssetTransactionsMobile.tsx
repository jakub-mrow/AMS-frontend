import { AssetTransactionsList } from "./AssetTransactionsList.tsx";
import { Asset, AssetTransaction } from "../types.ts";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";

export const AssetTransactionsMobile = ({
  asset,
  transactions,
  onClickTransaction,
  isLoading,
}: {
  asset: Asset;
  transactions: AssetTransaction[];
  onClickTransaction: (assetTransaction: AssetTransaction) => void;
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
          <AssetTransactionsList
            asset={asset}
            transactions={transactions}
            onClickTransaction={onClickTransaction}
          />
        </VerticalFlexContainer>
      )}
    </>
  );
};
