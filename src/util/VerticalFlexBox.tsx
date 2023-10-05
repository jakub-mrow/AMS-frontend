import { Box, BoxProps, styled } from "@mui/material";

interface VerticalFlexBoxProps extends BoxProps {
  fullHeight?: boolean;
}

export const VerticalFlexBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fullHeight",
})<VerticalFlexBoxProps>(({ fullHeight = false }) => ({
  display: "flex",
  flexDirection: "column",
  flex: fullHeight ? 1 : undefined,
}));
