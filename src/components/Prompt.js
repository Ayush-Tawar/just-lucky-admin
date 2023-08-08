import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { forwardRef, useState, useImperativeHandle, useMemo } from "react";

const Prompt = forwardRef((props, ref) => {
  const {
    title,
    text,
    positiveAction = () => {},
    negativeAction = () => {},
    positiveButtonText = "Yes",
    negativeButtonText = "No",
  } = props;

  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const show = () => setOpen(true);

  useImperativeHandle(ref, () => ({
    show: show,
  }));

  const handleAction = (actionType) => {
    if (actionType) {
      positiveAction();
    } else {
      negativeAction();
    }
    onClose();
  };

  return useMemo(
    () => (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAction(false)}>
            {negativeButtonText}
          </Button>
          <Button onClick={() => handleAction(true)}>
            {positiveButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [open],
  );
});

Prompt.displayName = "Prompt";
export default Prompt;
