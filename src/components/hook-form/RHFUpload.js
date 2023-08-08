import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { MEDIA_URL } from "src/utils/config";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";
import ImageCropper, { readFile } from "../ImageCropper";

// ----------------------------------------------------------------------

RHFUpload.propTypes = {
  name: PropTypes.string,
};

export const fileType = {
  image: "image",
  video: "video",
};

export default function RHFUpload({
  name,
  buttonText,
  aspectRatio = 1,
  disableRatioValidation = false,
  disableFileName = false,
  width = 100,
  cropBeforeUpload = true,
  type = fileType.image,
  ...other
}) {
  const { control } = useFormContext();
  const fileInputRef = useRef();
  const notify = useAlert();

  //IMAGE CROPPER
  const [openCropper, setOpenCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState("");

  const handleImage = async (file, field) => {
    //Without Image cropping
    if (file && !cropBeforeUpload) {
      var _URL = window.URL || window.webkitURL;
      const img = new Image();
      var objectUrl = _URL.createObjectURL(file);
      img.onload = async function () {
        if (
          !disableRatioValidation &&
          Number(Number(this.width / this.height).toFixed(1)) !== aspectRatio
        ) {
          notify.toastError(
            `The image should be of aspect ratio ${aspectRatio.toFixed(
              2,
            )} or ${width} x ${Number(width / aspectRatio).toFixed(1)}`,
          );
        } else {
          // console.log("success");
          field.onChange(file);
        }

        _URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    }

    //WITH Image Cropping
    if (file && cropBeforeUpload) {
      let imageDataUrl = await readFile(file);
      setImageToCrop(imageDataUrl);
      setOpenCropper(true);
    }
  };

  const handleVideo = (file, field) => {
    field.onChange(file);
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          if (_.isEmpty(field.value) && !(field.value instanceof File)) {
            return (
              <Stack>
                {openCropper && (
                  <ImageCropper
                    aspect={aspectRatio}
                    onClose={() => setOpenCropper(false)}
                    imageToCrop={imageToCrop}
                    onCrop={(croopedImageFile) =>
                      field.onChange(croopedImageFile)
                    }
                  />
                )}
                {other?.label && (
                  <Typography color="textSecondary" variant="caption" mb={0.5}>
                    {other?.label}
                  </Typography>
                )}
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {buttonText || "Upload"}
                  </Button>
                </Box>

                {!cropBeforeUpload && !disableRatioValidation && (
                  <Typography color="textSecondary" variant="caption">
                    {`Required dimensions are ${width} x ${Number(
                      width / aspectRatio,
                    ).toFixed(0)} or aspect ratio of ${aspectRatio.toFixed(1)}`}
                  </Typography>
                )}

                <Typography color="error" variant="caption">
                  {fieldState?.error?.message || ""}
                </Typography>
                <input
                  type="file"
                  accept={
                    type === fileType.video
                      ? "video/mp4, video/mov"
                      : "image/png, image/jpeg, image/jpg, image/webp"
                  }
                  ref={fileInputRef}
                  onChange={async (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      if (type === fileType.video) {
                        handleVideo(file, field);
                      } else {
                        handleImage(file, field);
                      }
                    }
                  }}
                  style={{ display: "none" }}
                />
              </Stack>
            );
          }
          let fileUrl = "";
          let fileName = "";
          if (typeof field.value === "string") {
            fileUrl = MEDIA_URL + field.value;
            fileName = fileUrl.split("/").pop() ?? "file";
          }
          if (field.value instanceof File) {
            fileUrl = URL.createObjectURL(field.value);
            fileName = field.value.name;
          }
          return (
            <>
              <Box
                bgcolor="divider"
                overflow="hidden"
                boxShadow={2}
                height={disableFileName ? "100%" : "auto"}
              >
                {type === fileType.video ? (
                  <Box
                    display="flex"
                    autoPlay={false}
                    controls
                    component="video"
                    src={fileUrl}
                    sx={{
                      mx: "auto",
                      width: "100%",
                      height: "auto",
                      maxHeight: 400,
                    }}
                  />
                ) : (
                  <Box height="100%" display="flex" justifyContent="center">
                    <Box
                      component="img"
                      src={fileUrl}
                      sx={{
                        mx: "auto",
                        width: "auto",
                        height: "auto",
                        maxHeight: 300,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                )}
              </Box>
              {!disableFileName && (
                <Box my={1}>
                  <Chip
                    color="primary"
                    variant="outlined"
                    label={
                      fileName.substring(0, 16) +
                      (fileName.length > 16 ? "..." : "")
                    }
                    onDelete={() => {
                      field.onChange("");
                    }}
                  />
                </Box>
              )}
            </>
          );
        }}
      />
    </>
  );
}
