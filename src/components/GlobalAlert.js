import React, { forwardRef, useImperativeHandle, useState } from "react";
import Box from "@mui/material/Box";
import _ from "lodash-es";
import { Alert, Slide, Snackbar } from "@mui/material";

const GlobalAlert = forwardRef((props, ref) => {
  //For Toast View
  const [toast, setToast] = useState({});

  useImperativeHandle(ref, () => ({
    //Snackbar Types
    toastSuccess: (msg) => handleToast("success", msg),
    toastError: (msg) => handleToast("error", msg),
    toastInfo: (msg) => handleToast("info", msg),
    toastWarning: (msg) => handleToast("warning", msg),
  }));

  const handleToast = (type = "success", message = "Hello!") => {
    setToast({
      severity: type,
      message: message,
    });
  };

  return (
    <>
      {/* To Display Custom Toast Messages Only */}
      {!_.isEmpty(toast) && !_.isEmpty(toast.message) && (
        <Snackbar
          open={Boolean(toast.message)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3500}
          TransitionComponent={(props) => <Slide {...props} direction="down" />}
          onClose={() => setToast({})}
        >
          <Box boxShadow={3} borderRadius={1} overflow="hidden">
            <Alert
              variant="filled"
              onClose={() => setToast({})}
              severity={toast.severity}
            >
              {toast.message}
            </Alert>
          </Box>
        </Snackbar>
      )}
    </>
  );
});

GlobalAlert.displayName = "GlobalAlert";

export default GlobalAlert;
