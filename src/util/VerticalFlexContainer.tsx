import { Container, ContainerProps, styled } from "@mui/material";

interface VerticalFlexContainerProps extends ContainerProps {
  fullHeight?: boolean;
}

export const VerticalFlexContainer = styled(
  Container,
)<VerticalFlexContainerProps>(({ fullHeight = false }) => ({
  display: "flex",
  flexDirection: "column",
  flex: fullHeight ? 1 : undefined,
}));
