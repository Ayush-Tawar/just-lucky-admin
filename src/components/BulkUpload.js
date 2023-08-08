import { useRef } from "react";
import Iconify from "./Iconify";
import { Button } from "@mui/material";

export default function BulkUpload({ onChangeFiles, children }) {
  const fileInputRef = useRef();

  return (
    <>
      <Button
        onClick={() => fileInputRef?.current?.click()}
        variant="outlined"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        {children}
      </Button>
      <input
        type="file"
        multiple
        accept={"image/png, image/jpeg, image/jpg, image/webp"}
        ref={fileInputRef}
        onChange={async (e) => {
          if (e.target.files && e.target.files.length > 0) {
            onChangeFiles([...e.target.files]);
          }
        }}
        style={{ display: "none" }}
      />
    </>
  );
}
