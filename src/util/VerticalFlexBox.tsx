import { Box, BoxProps, styled } from "@mui/material";

interface VerticalFlexBoxProps extends BoxProps {
  fullHeight?: boolean;
}

export const VerticalFlexBox = styled(Box)<VerticalFlexBoxProps>(
  ({ fullHeight = false }) => ({
    display: "flex",
    flexDirection: "column",
    flex: fullHeight ? 1 : undefined,
  }),
);
