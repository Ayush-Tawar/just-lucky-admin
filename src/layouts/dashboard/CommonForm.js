import PropTypes from "prop-types";
// material
import { Box, Drawer, Typography, Stack, IconButton } from "@mui/material";
// mock
import Iconify from "src/components/Iconify";
import { FormProvider } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import Scrollbar from "src/components/Scrollbar";

CommonForm.propTypes = {
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formTitle: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  drawerWidth: PropTypes.number,
};

export default function CommonForm({
  onClose,
  methods,
  onSubmit,
  isSubmitting,
  formTitle,
  children,
}) {
  const { handleSubmit } = methods;

  return (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 5, mx: 4 }}>
          <Stack direction="row" sx={{ mt: 4, mb: 5 }} alignItems="center">
            <Typography variant="h5" flex={1}>
              {formTitle}
            </Typography>
            <IconButton onClick={onClose}>
              <Iconify icon="codicon:chrome-close" width={30} height={30} />
            </IconButton>
          </Stack>
          <Stack spacing={3}>{children}</Stack>
          <Stack
            direction="row"
            sx={{ mt: 4 }}
            justifyContent="end"
            spacing={2}
          >
            <LoadingButton
              size="large"
              variant="outlined"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </LoadingButton>
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
        </Box>
      </FormProvider>
    </Scrollbar>
  );
}
