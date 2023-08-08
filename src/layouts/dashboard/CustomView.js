// material
import { Card, Stack, Container, Typography, Grid } from "@mui/material";
// components
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Page from "src/components/Page";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "src/utils/AuthContext";
import CommonSpinner from "src/components/CommonSpinner";
import _ from "lodash";
import RHFUpload from "src/components/hook-form/RHFUpload";
import { controller } from "src/controllers";

export default function CustomView({ type }) {
  const { apis } = useAuth();
  const api = apis[controller[type]["apiHook"]];

  const {
    onUpdate,
    onCreate,
    onDelete,
    isSubmitting,
    isLoading,
    setIsLoading,
    submit,
    data,
  } = api;
  const defaultValues = { ...data };

  const onSubmit = () => {};

  return (
    <Page title="About us">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
        </Stack>
        {isLoading ? (
          <CommonSpinner />
        ) : (
          <Card sx={{ p: 5 }}>
            <Form
              defaultValues={defaultValues}
              onSubmit={onSubmit}
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
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    image1: Yup.mixed().test(
      "required",
      "Image is required",
      (value) => !_.isEmpty(value) || value instanceof File,
    ),
    image1AltText: Yup.string().required("Image alt text is required"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} spacing={4}>
          <Stack spacing={3}>
            <RHFTextField name="title" label="Title" />
            <RHFTextField
              multiline
              rows={16}
              name="description"
              label="Description"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <RHFTextField name="image1AltText" label="Image Alt Text" />
            <RHFUpload name="image1" buttonText="Upload Image" />
          </Stack>
        </Grid>
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
