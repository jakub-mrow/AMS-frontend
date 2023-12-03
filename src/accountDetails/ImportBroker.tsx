import { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export const ImportBroker = ({
  onSend,
  onClose,
  isMobile,
}: {
  onSend: (file: File, broker: string) => Promise<void>;
  onClose: () => void;
  isMobile: boolean;
}) => {
  const [brokerFile, setBrokerFile] = useState<File | null>(null);
  const [broker, setBroker] = useState<string>("");
  const [brokerFileLoading, setBrokerFileLoading] = useState<boolean>(false);

  const sendBrokerFileHandler = () => {
    setBrokerFileLoading(true);
    if (!brokerFile || broker.trim() === "") {
      return;
    }
    onSend(brokerFile, broker).then(() => {
      setBrokerFileLoading(false);
      onClose();
    });
  };
  return (
    <>
      <Typography variant="body1">
        Import transactions from a file exported from your broker.
      </Typography>
      <TextField
        id="broker"
        value={broker}
        select
        onChange={(event) => {
          setBroker(event.target.value as string);
        }}
        label="Broker"
        fullWidth
        sx={{ my: 2 }}
      >
        <MenuItem value="degiro">Degiro</MenuItem>
        <MenuItem value="trading212">Trading212</MenuItem>
        <MenuItem value="exante">Exante</MenuItem>
        <MenuItem value="dmbos">DM BOŚ</MenuItem>
      </TextField>
      {!isMobile ? (
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              Choose file
              <input
                type="file"
                hidden
                onChange={(event) => {
                  if (event.target.files) {
                    setBrokerFile(event.target.files[0]);
                  }
                }}
              />
            </Button>
            <Typography noWrap variant="body1" sx={{ ml: 2, maxWidth: 200 }}>
              {brokerFile?.name}
            </Typography>
          </Box>
          <LoadingButton
            variant="contained"
            component="label"
            loading={brokerFileLoading}
            onClick={() => sendBrokerFileHandler()}
          >
            Send
          </LoadingButton>
        </Box>
      ) : (
        <>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<CloudUpload />}
            sx={{ my: 2 }}
          >
            Choose file
            <input
              type="file"
              hidden
              onChange={(event) => {
                if (event.target.files) {
                  setBrokerFile(event.target.files[0]);
                }
              }}
            />
          </Button>
          {brokerFile ? (
            <Typography noWrap variant="body1">
              {brokerFile.name}
            </Typography>
          ) : (
            <Typography noWrap variant="body1">
              &nbsp;
            </Typography>
          )}
          <LoadingButton
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
            loading={brokerFileLoading}
            onClick={() => sendBrokerFileHandler()}
          >
            Send
          </LoadingButton>
        </>
      )}
    </>
  );
};
