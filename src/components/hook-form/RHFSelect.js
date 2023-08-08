import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

RHFSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  disableNoneOption: PropTypes.bool,
};

export default function RHFSelect({
  name,
  label,
  disableNoneOption = true,
  options,
  ...other
}) {
  const { control } = useFormContext();

  const optionMap = options.map((o) => {
    return {
      label: o,
      value: o,
    };
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Stack direction="column">
            <FormControl error={error && error.message}>
              <InputLabel
                id={label}
                sx={{
                  backgroundColor: "white",
                  paddingLeft: 0.5,
                  paddingRight: 0.5,
                }}
              >
                {label}
              </InputLabel>
              <Select labelId={label} {...field} {...other} error={!!error}>
                {!disableNoneOption && (
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                )}
                {optionMap.map((op, index) => (
                  <MenuItem key={`${op.label}_${index}`} value={op.label}>
                    {op.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message || ""}</FormHelperText>
            </FormControl>
          </Stack>
        );
      }}
    />
  );
}
