import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { ImportCsv } from "./ImportCsv.tsx";
import { ImportBroker } from "./ImportBroker.tsx";
import { useState } from "react";
import { Close } from "@mui/icons-material";

export const ImportDialog = ({
  isOpen,
  onClose,
  onSendImport,
  onSendBrokerFile,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSendImport: (file: File) => Promise<void>;
  onSendBrokerFile: (file: File, broker: string) => Promise<void>;
}) => {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>Import transactions</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <Tabs value={tab} onChange={(_event, newValue) => setTab(newValue)}>
          <Tab label="CSV" />
          <Tab label="Broker" />
        </Tabs>
        <Paper elevation={2} sx={{ p: 2 }}>
          {tab === 0 && (
            <ImportCsv
              onSend={onSendImport}
              onClose={onClose}
              isMobile={isMobile}
            />
          )}
          {tab === 1 && (
            <ImportBroker
              onSend={onSendBrokerFile}
              onClose={onClose}
              isMobile={isMobile}
            />
          )}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};
