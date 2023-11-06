import { AssetTransactionsList } from "./AssetTransactionsList.tsx";
import { Asset, AssetTransaction } from "../types.ts";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";

export const AssetTransactionsMobile = ({
  asset,
  transactions,
  isLoading,
}: {
  asset: Asset;
  transactions: AssetTransaction[];
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
          <AssetTransactionsList asset={asset} transactions={transactions} />
        </VerticalFlexContainer>
      )}
    </>
  );
};
