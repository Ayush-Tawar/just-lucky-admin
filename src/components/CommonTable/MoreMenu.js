import { useRef, useState } from "react";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Iconify from "../Iconify";
// component

// ----------------------------------------------------------------------

export default function MoreMenu({ onEdit, onDelete, onReset, onView }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleClose = () => setOpenDeleteConfirm(false);

  const handleMenu = (type) => {
    setIsOpen(false);
    switch (type) {
      case "edit":
        return onEdit();
      case "delete":
        return setOpenDeleteConfirm(true);
      case "view":
        return onView();
      case "reset":
        return onReset();
    }
  };

  return (
    <Stack direction="row" justifyContent="flex-end">
      {typeof onEdit == "function" && (
        <IconButton
          sx={{
            color: "text.secondary",
          }}
          onClick={() => handleMenu("edit")}
        >
          <Iconify icon="eva:edit-fill" width={24} height={24} />
        </IconButton>
      )}
      {typeof onDelete === "function" && (
        <IconButton
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "error.main",
            },
          }}
          onClick={() => handleMenu("delete")}
        >
          <Iconify icon="eva:trash-2-outline" width={24} height={24} />
        </IconButton>
      )}
      {typeof onView === "function" && (
        <IconButton
          sx={{
            color: "text.secondary",
          }}
          onClick={() => handleMenu("view")}
        >
          <Iconify icon="carbon:view-filled" width={24} height={24} />
        </IconButton>
      )}
      <Dialog
        open={openDeleteConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              handleClose();
              onDelete();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );

  // Removed More Menu & directly show menu icons

  // return (
  //   <>
  //     <IconButton ref={ref} onClick={() => setIsOpen(true)}>
  //       <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
  //     </IconButton>

  //     <Menu
  //       open={isOpen}
  //       anchorEl={ref.current}
  //       onClose={() => setIsOpen(false)}
  //       PaperProps={{
  //         sx: { width: 200, maxWidth: "100%" },
  //       }}
  //       anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //       transformOrigin={{ vertical: "top", horizontal: "right" }}
  //     >
  //       <MenuItem
  //         sx={{ color: "text.secondary" }}
  //         onClick={() => handleMenu("edit")}
  //       >
  //         <ListItemIcon>
  //           <Iconify icon="eva:edit-fill" width={24} height={24} />
  //         </ListItemIcon>
  //         <ListItemText
  //           primary="Edit"
  //           primaryTypographyProps={{ variant: "body2" }}
  //         />
  //       </MenuItem>
  //       {typeof onDelete === "function" && (
  //         <MenuItem
  //           sx={{ color: "text.secondary" }}
  //           onClick={() => handleMenu("delete")}
  //         >
  //           <ListItemIcon>
  //             <Iconify icon="eva:trash-2-outline" width={24} height={24} />
  //           </ListItemIcon>
  //           <ListItemText
  //             primary="Delete"
  //             primaryTypographyProps={{ variant: "body2" }}
  //           />
  //         </MenuItem>
  //       )}
  //       {typeof onReset === "function" && (
  //         <MenuItem
  //           sx={{ color: "text.secondary" }}
  //           onClick={() => handleMenu("reset")}
  //         >
  //           <ListItemIcon>
  //             <Iconify icon="ci:refresh" width={24} height={24} />
  //           </ListItemIcon>
  //           <ListItemText
  //             primary="Reset"
  //             primaryTypographyProps={{ variant: "body2" }}
  //           />
  //         </MenuItem>
  //       )}
  //     </Menu>
  //   </>
  // );
}
