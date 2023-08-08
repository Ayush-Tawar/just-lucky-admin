// material
import { Card, Stack, Container, Typography, Box, Grid } from "@mui/material";
// components
import Page from "../components/Page";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "src/utils/AuthContext";
import CommonSpinner from "src/components/CommonSpinner";
import _ from "lodash";
import RHFUpload from "src/components/hook-form/RHFUpload";
import RHFEditor from "src/components/hook-form/RHFEditor";

export default function Venue() {
  const { apis } = useAuth();
  const { onUpdate, isSubmitting, isLoading, data } = apis.venueApi;

  const defaultValues = data[0];

  return (
    <Page title="Venue">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Venue
          </Typography>
        </Stack>

        {isLoading ? (
          <CommonSpinner />
        ) : (
          <Card sx={{ p: 5 }}>
            <Form
              defaultValues={defaultValues}
              onSubmit={onUpdate}
              isSubmitting={isSubmitting}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}

const Form = ({ onSubmit, defaultValues, isSubmitting }) => {
  const schema = Yup.object().shape({
    menuArray: Yup.array().of(
      Yup.object().shape({
        id: Yup.string(),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        image1: Yup.mixed().test(
          "required",
          "Image is required",
          (value) => !_.isEmpty(value) || value instanceof File,
        ),
        image2: Yup.mixed().test(
          "required",
          "Image is required",
          (value) => !_.isEmpty(value) || value instanceof File,
        ),
        image3: Yup.mixed().test(
          "required",
          "Image is required",
          (value) => !_.isEmpty(value) || value instanceof File,
        ),
        image4: Yup.mixed().test(
          "required",
          "Image is required",
          (value) => !_.isEmpty(value) || value instanceof File,
        ),
        image1AltText: Yup.string(),
        image2AltText: Yup.string(),
        image3AltText: Yup.string(),
        image4AltText: Yup.string(),
      }),
    ),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, watch } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Grid container spacing={6}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              <RHFTextField name={`title`} label="Title" />
            </Grid>
            <Grid item xs={12}>
              <RHFEditor name={`description`} label="Description" />
            </Grid>
            {[1.14, 0.82, 0.82, 1.14].map((m, index) => (
              <Grid item xs={3} key={index}>
                <Box>
                  <RHFUpload
                    aspectRatio={m}
                    cropBeforeUpload
                    name={`image${index + 1}`}
                    label={`Image ${index + 1}`}
                  />
                  <RHFTextField
                    name={`image${index + 1}AltText`}
                    label="Alt text"
                    sx={{ mt: 2 }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Stack direction="row" sx={{ mt: 4 }} justifyContent="start">
          <LoadingButton
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};
