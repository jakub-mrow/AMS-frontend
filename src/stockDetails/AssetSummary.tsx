import { Asset } from "../types.ts";
import { Box, Divider, Typography } from "@mui/material";
import { VerticalFlexContainer } from "../util/VerticalFlexContainer.tsx";
import { Loading } from "../util/Loading.tsx";
import { displayCurrency } from "../util/display-currency.ts";

export const AssetSummary = ({
  stock,
  isLoading,
}: {
  isLoading: boolean;
  stock: Asset;
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
              {displayCurrency(stock.value, stock.currency)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Quantity:</Typography>
            <Typography variant="h5">{stock.quantity}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Price:</Typography>
            <Typography variant="h5">
              {displayCurrency(stock.value / stock.quantity, stock.currency)}
            </Typography>
          </Box>
          <Divider />
        </VerticalFlexContainer>
      )}
    </>
  );
};
