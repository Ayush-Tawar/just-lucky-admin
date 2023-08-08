// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Grid,
  Fab,
  IconButton,
  Box,
} from "@mui/material";
// components
import Page from "../components/Page";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useAuth } from "src/utils/AuthContext";
import CommonSpinner from "src/components/CommonSpinner";
import _ from "lodash";
import RHFUpload from "src/components/hook-form/RHFUpload";
import Iconify from "src/components/Iconify";
import { useMemo, useRef } from "react";
import CircularProgressWithLabel from "src/components/CircularProgress";

export default function Gallery() {
  const { apis } = useAuth();
  const api = apis.galleryApi;
  const {
    onUpdate,
    batchUpload,
    isSubmitting,
    isLoading,
    submit,
    data,
    batchProgress,
  } = api;

  const defaultValues = useMemo(() => {
    return {
      images: _.isArray(data)
        ? data.map((d) => {
            return {
              id: d.id,
              img: d.img,
              alt: d.alt,
            };
          })
        : [],
    };
  }, [data]);

  const onSubmit = (vals) => {
    const updatedList = vals.images.filter(
      (f) => !_.isEmpty(f.img) || f.img instanceof File,
    );
    const deletedList = defaultValues.images.filter(
      (o) =>
        vals.images.findIndex((updatedObject) => updatedObject.id === o.id) ===
        -1,
    );
    onUpdate(updatedList, deletedList);
  };

  return (
    <Page title="Gallery">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Gallery
          </Typography>
          {/* <BulkUpload onChangeFiles={handleBulkUpload}>
            Bulk Upload Images
          </BulkUpload> */}
        </Stack>
        {isLoading ? (
          <CommonSpinner />
        ) : batchProgress > 0 && batchProgress < 100 ? (
          <CircularProgressWithLabel value={batchProgress} />
        ) : (
          <Form
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </Container>
    </Page>
  );
}

const Form = ({ onSubmit, defaultValues, isSubmitting }) => {
  const schema = Yup.object().shape({
    images: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        img: Yup.mixed().required("Image is required"),
        alt: Yup.string(),
      }),
    ),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "images",
  });

  const addMore = () => {
    append({
      img: "",
      alt: "",
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {fields.map((io, index) => {
          return (
            <Grid item xs={4} md={4} key={io.id}>
              <Card
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "visible",
                  height: "100%",
                  "&:hover": {
                    "& #closeBtn": {
                      visibility: "visible",
                    },
                  },
                }}
              >
                {!isSubmitting && (
                  <IconButton
                    id="closeBtn"
                    sx={{
                      position: "absolute",
                      right: -5,
                      top: -5,
                      visibility: "hidden",
                      backgroundColor: (theme) => theme.palette.error.main,
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.error.light,
                      },
                    }}
                    onClick={() => remove(index)}
                  >
                    <Iconify
                      icon="codicon:chrome-close"
                      sx={{ color: "#FFF" }}
                      width={16}
                      height={16}
                    />
                  </IconButton>
                )}
                <Stack spacing={3} display="flex" height={"100%"}>
                  <RHFUpload
                    disableFileName
                    aspectRatio={4 / 3}
                    name={`images.${index}.img`}
                    buttonText="Upload Image"
                  />
                  <RHFTextField
                    name={`images.${index}.alt`}
                    label="Image Alt Text"
                  />
                </Stack>
              </Card>
            </Grid>
          );
        })}
        {!isSubmitting && (
          <Grid
            item
            xs={4}
            md={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight={300}
          >
            <Fab color="primary" onClick={addMore}>
              <Iconify icon="mingcute:add-fill" height={30} width={30} />
            </Fab>
            <Typography sx={{ my: 1 }}>Add Image</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <LoadingButton
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
