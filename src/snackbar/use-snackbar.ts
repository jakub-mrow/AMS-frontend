import { useContext } from "react";
import { SnackbarContext } from "./snackbar-context.ts";

export const useSnackbar = () => {
  const snackbarCtx = useContext(SnackbarContext);
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  return snackbarCtx?.alert ?? ((_message, _severity) => {});
};
