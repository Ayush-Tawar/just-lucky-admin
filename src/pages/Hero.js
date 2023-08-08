// material
import { Card, Stack, Container, Typography, Box } from "@mui/material";
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
import { useMemo } from "react";
import RHFUpload, { fileType } from "src/components/hook-form/RHFUpload";

export default function Hero() {
  const { apis } = useAuth();
  const { onUpdate, isSubmitting, isLoading, data } = apis.cmsApi;

  const currentData = useMemo(() => {
    if (!_.isEmpty(data) && data.length > 1) {
      return data.find((d) => d.title === "Top/Banner Section");
    }
  }, [data]);

  const defaultValues = {
    id: currentData?.id,
    content: currentData?.content,
    heroSectionVideo: currentData?.heroSectionVideo,
  };

  return (
    <Page title="Hero">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Hero Title
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
    id: Yup.string(),
    content: Yup.string().required("Title is required"),
    heroSectionVideo: Yup.mixed().test(
      "required",
      "Video is required",
      (value) => !_.isEmpty(value) || value instanceof File,
    ),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box maxWidth={500}>
        <Stack spacing={3}>
          <RHFTextField name="content" label="Title" />
          <RHFUpload
            aspectRatio={16 / 9}
            disableRatioValidation
            name="heroSectionVideo"
            label="Video"
            type={fileType.video}
          />
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
      </Box>
    </FormProvider>
  );
};
