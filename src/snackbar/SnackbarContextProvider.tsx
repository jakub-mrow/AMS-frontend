import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Severity, SnackbarContext } from "./snackbar-context";

type SnackbarEntry = {
  message: string;
  severity: Severity;
};

export const SnackbarContextProvider = (props: { children: ReactNode }) => {
  const [snackbars, setSnackbars] = useState<SnackbarEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarEntry | null>(null);

  useEffect(() => {
    if (snackbars.length && !messageInfo) {
      setMessageInfo({ ...snackbars[0] });
      setSnackbars((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackbars.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackbars, messageInfo, open]);

  const handleAlert = useCallback((message: string, severity: Severity) => {
    setSnackbars((prev) => [...prev, { message: message, severity }]);
  }, []);

  const handleCloseSnackbar = (
    _event: Event | React.SyntheticEvent<unknown>,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(null);
  };

  return (
    <SnackbarContext.Provider
      value={{
        alert: handleAlert,
      }}
    >
      {props.children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert
          severity={messageInfo?.severity}
          onClose={handleCloseAlert}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messageInfo?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
