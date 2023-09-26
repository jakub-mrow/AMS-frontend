import React from "react";

export enum Severity {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export interface SnackbarContextInterface {
  alert: (message: string, severity: Severity) => void;
}

export const SnackbarContext =
  React.createContext<SnackbarContextInterface | null>(null);
