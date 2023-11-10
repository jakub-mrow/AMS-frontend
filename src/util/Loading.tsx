import { VerticalFlexBox } from "./VerticalFlexBox.tsx";
import { CircularProgress } from "@mui/material";

export const Loading = () => (
  <VerticalFlexBox
    fullHeight
    sx={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </VerticalFlexBox>
);
