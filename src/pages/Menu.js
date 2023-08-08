// material
import { Card, Stack, Container, Typography, Box, Grid } from "@mui/material";
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

export default function Menu() {
  const { apis } = useAuth();
  const { onUpdate, isSubmitting, isLoading, data } = apis.menuApi;

  const defaultValues = {
    menuArray: data,
  };

  return (
    <Page title="Menu">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Menu
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
        name: Yup.string().required("Page name is required"),
        image1: Yup.mixed().test(
          "required",
          "Menu image is required",
          (value) => !_.isEmpty(value) || value instanceof File,
        ),
        image2: Yup.mixed().test(
          "required",
          "Menu image is required",
          (value) => !_.isEmpty(value) || value instanceof File,
        ),
        image3: Yup.mixed(),
        image1AltText: Yup.string(),
        image2AltText: Yup.string(),
        image3AltText: Yup.string(),
      }),
    ),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit, watch } = methods;

  const { fields } = useFieldArray({
    control: methods.control,
    name: "menuArray",
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Grid container spacing={6}>
          {fields.map((f, index) => (
            <Grid container item xs={12} key={f.id}>
              <Grid item xs={12}>
                <RHFTextField
                  name={`menuArray.${index}.name`}
                  label="Page Name"
                  sx={{ maxWidth: 400 }}
                />
              </Grid>
              <Stack direction="row" mt={4} gap={3} mb={4}>
                <Box>
                  <RHFUpload
                    aspectRatio={0.6285}
                    cropBeforeUpload
                    name={`menuArray.${index}.image1`}
                    label="Image 1"
                  />
                  <RHFTextField
                    name={`menuArray.${index}.image1AltText`}
                    label="Alt Text"
                    sx={{ mt: 2 }}
                  />
                </Box>
                <Box>
                  <RHFUpload
                    aspectRatio={0.6285}
                    cropBeforeUpload
                    name={`menuArray.${index}.image2`}
                    label="Image 2"
                  />
                  <RHFTextField
                    name={`menuArray.${index}.image2AltText`}
                    label="Alt Text"
                    sx={{ mt: 2 }}
                  />
                </Box>
                <Box>
                  <RHFUpload
                    aspectRatio={0.6285}
                    cropBeforeUpload
                    name={`menuArray.${index}.image3`}
                    label="Image 3"
                  />
                  <RHFTextField
                    name={`menuArray.${index}.image3AltText`}
                    label="Alt Text"
                    sx={{ mt: 2 }}
                  />
                </Box>
              </Stack>
            </Grid>
          ))}
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
