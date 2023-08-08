import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  ClickAwayListener,
  InputAdornment,
  Popper,
  TextField,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
// ----------------------------------------------------------------------

RHFColorPicker.propTypes = {
  name: PropTypes.string,
};

export default function RHFColorPicker({ name, ...other }) {
  const { control } = useFormContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            helperText={error?.message}
            {...other}
            onClick={handleOpen}
            InputProps={{
              "aria-labelledby": id,
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    boxShadow={2}
                    bgcolor={field.value || "#000"}
                    sx={{ height: 25, width: 25 }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            style={{ zIndex: 9999 }}
          >
            <ClickAwayListener onClickAway={handleOpen}>
              <Box
                shadow={5}
                sx={{
                  p: 1,
                  bgcolor: "background.paper",
                }}
              >
                <HexColorPicker
                  color={field.value || "#000"}
                  onChange={field.onChange}
                />
              </Box>
            </ClickAwayListener>
          </Popper>
        </>
      )}
    />
  );
}
