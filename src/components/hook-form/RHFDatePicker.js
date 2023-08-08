import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
};

export default function RHFDatePicker({ name, label, ...other }) {
  const { control } = useFormContext();
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DesktopDatePicker
            label={label}
            inputFormat="DD/MM/YYYY"
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            minutesStep={5}
            {...field}
            renderInput={(params) => (
              <TextField
                label={label}
                onClick={(e) => {
                  e.target.blur();
                  setPickerOpen(!pickerOpen);
                }}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...params}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}
