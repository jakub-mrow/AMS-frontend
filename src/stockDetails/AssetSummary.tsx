import { Asset, AssetBalanceHistory, BaseStockValue } from "../types.ts";
import { Box, Divider, Typography } from "@mui/material";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";
import { displayCurrency } from "../util/display-currency.ts";
import { AssetChart } from "./AssetChart.tsx";

export const AssetSummary = ({
  stock,
  histories,
  isLoading,
  baseStockValue,
  isMobile,
}: {
  isLoading: boolean;
  histories: AssetBalanceHistory[];
  stock: Asset;
  baseStockValue: BaseStockValue;
  isMobile: boolean;
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
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Value:</Typography>
            <Typography variant="h5">
              {displayCurrency(stock.price * stock.quantity, stock.currency)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">
              Value in {baseStockValue.currency}:
            </Typography>
            <Typography variant="h5">
              {displayCurrency(
                baseStockValue.price * stock.quantity,
                baseStockValue.currency,
              )}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Quantity:</Typography>
            <Typography variant="h5">{stock.quantity}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Price:</Typography>
            <Typography variant="h5">
              {displayCurrency(stock.price, stock.currency)}
            </Typography>
          </Box>
          <Divider />
          {isMobile && (
            <AssetChart
              isLoading={isLoading}
              histories={histories}
              isMobile={isMobile}
              stockCurrency={stock.currency}
            />
          )}
        </VerticalFlexContainer>
      )}
    </>
  );
};
