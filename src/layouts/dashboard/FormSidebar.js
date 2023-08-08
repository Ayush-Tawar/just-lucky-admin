import PropTypes from "prop-types";
// material
import { Box, Drawer, Typography, Stack, IconButton } from "@mui/material";
// mock
import Iconify from "src/components/Iconify";
import { FormProvider } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import Scrollbar from "src/components/Scrollbar";

const DRAWER_WIDTH = 500;

FormSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  formTitle: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  drawerWidth: PropTypes.number,
};

export default function FormSidebar({
  isOpenSidebar,
  onCloseSidebar,
  methods,
  onSubmit,
  isSubmitting,
  formTitle,
  children,
  drawerWidth = DRAWER_WIDTH,
}) {
  const { handleSubmit } = methods;

  const renderContent = (
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
          <Stack direction="row" sx={{ mt: 4, mb: 5 }} alignItems="start">
            <Typography variant="h3" flex={1}>
              {formTitle}
            </Typography>
            <IconButton onClick={onCloseSidebar}>
              <Iconify icon="codicon:chrome-close" width={30} height={30} />
            </IconButton>
          </Stack>
          <Stack spacing={3}>{children}</Stack>
          <Stack direction="row" sx={{ mt: 4 }} justifyContent="end">
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

  return (
    <Drawer
      anchor="right"
      open={isOpenSidebar}
      onClose={onCloseSidebar}
      PaperProps={{
        sx: { width: drawerWidth },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
