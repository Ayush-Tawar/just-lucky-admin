import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Autocomplete, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

RHFAutocomplete.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
};

export default function RHFAutocomplete({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (other.multiple) {
          return (
            <Autocomplete
              multiple
              options={options}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )}
              isOptionEqualToValue={(op, v) => op.value === v.value}
              {...field}
              onChange={(e, data) => field.onChange(data)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={other.label || ""}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          );
        }

        return (
          <Autocomplete
            isOptionEqualToValue={(option, value) =>
              option.value === value || value._id === option.value._id
            }
            options={options}
            getOptionLabel={(option) => {
              return (
                option?.label ??
                option?.name ??
                options.find(({ label }) => label === option)?.label ??
                ""
              );
            }}
            {...field}
            {...other}
            onChange={(_event, data) => {
              field.onChange((data && data.value) || "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={other.label || ""}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        );
      }}
    />
  );
}
