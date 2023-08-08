import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Typography } from "@mui/material";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// ----------------------------------------------------------------------

RHFEditor.propTypes = {
  name: PropTypes.string,
};

export default function RHFEditor({ name, ...other }) {
  const { control } = useFormContext();
  const [editor, setEditor] = useState();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, ...rest }) => (
        <>
          {other?.label && (
            <Typography color="textSecondary" variant="body2">
              {other?.label}
            </Typography>
          )}
          <CKEditor
            onChange={() => {
              field.onChange(editor.getData());
            }}
            data={field.value || ""}
            onReady={(e) => setEditor(e)}
            editor={ClassicEditor}
          />
          <Typography color="error" variant="caption">
            {fieldState?.error?.message || ""}
          </Typography>
        </>
      )}
    />
  );
}
