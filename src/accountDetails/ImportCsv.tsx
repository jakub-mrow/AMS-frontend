import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export const ImportCsv = ({
  onSend,
  onClose,
  isMobile,
}: {
  onSend: (file: File) => Promise<void>;
  onClose: () => void;
  isMobile: boolean;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  const sendFileHandler = () => {
    setFileLoading(true);
    if (!file) {
      return;
    }
    onSend(file).then(() => {
      setFileLoading(false);
      onClose();
    });
  };
  return (
    <>
      <Typography variant="body1">
        Import transactions from a CSV file
      </Typography>
      {!isMobile ? (
        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
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
                    setFile(event.target.files[0]);
                  }
                }}
              />
            </Button>
            <Typography
              noWrap
              variant="body1"
              sx={{ ml: 2, width: 200, maxWidth: 200 }}
            >
              {file?.name}
            </Typography>
          </Box>
          <LoadingButton
            variant="contained"
            component="label"
            loading={fileLoading}
            onClick={sendFileHandler}
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
                  setFile(event.target.files[0]);
                }
              }}
            />
          </Button>
          {file ? (
            <Typography noWrap variant="body1">
              {file.name}
            </Typography>
          ) : (
            <Typography noWrap variant="body1">
              &nbsp;
            </Typography>
          )}
          <LoadingButton
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
            loading={fileLoading}
            onClick={sendFileHandler}
            fullWidth
          >
            Send
          </LoadingButton>
        </>
      )}
    </>
  );
};
