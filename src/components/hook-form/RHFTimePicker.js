import { useState } from "react";
import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

// ----------------------------------------------------------------------

RHFTimePicker.propTypes = {
  name: PropTypes.string,
};

export default function RHFTimePicker({ name, label, ...other }) {
  const { control } = useFormContext();
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TimePicker
            label={label}
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
