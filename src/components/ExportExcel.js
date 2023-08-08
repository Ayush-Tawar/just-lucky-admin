import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Iconify from "./Iconify";
import { useEffect, useState } from "react";
import { FormProvider, RHFDatePicker } from "./hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { getDDMMYYY } from "src/utils/commons";
import { API_BASE_URL } from "src/utils/config";
import { LoadingButton } from "@mui/lab";
import { types } from "src/controllers";

export default function ExportExcel({ type }) {
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSheetDownload = async (vals) => {
    let sheetType = "subscriber";
    if (type === types.CONTACT_US) {
      sheetType = "contactUs";
    }
    if (type === types.VENUE_BOOKING) {
      sheetType = "bookVenue";
    }
    try {
      setIsSubmitting(true);
      const startDate = getDDMMYYY(vals.startDate);
      const endDate = getDDMMYYY(vals.endDate);
      const url = `getAllData/exportExcel?startDate=${encodeURIComponent(
        startDate,
      )}&endDate=${encodeURIComponent(endDate)}&type=${sheetType}`;
      const link = document.createElement("a");
      link.href = API_BASE_URL + url;
      link.download = `${new Date().getTime()}.xlsx`;
      link.click();
      setIsSubmitting(false);
      setOptionModalVisible(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const LoginSchema = Yup.object().shape({
    startDate: Yup.mixed().test(
      "required",
      "Start date is required",
      (value) => !_.isEmpty(value) && value instanceof dayjs,
    ),
    endDate: Yup.mixed().test(
      "required",
      "End date is required",
      (value) => !_.isEmpty(value) && value instanceof dayjs,
    ),
  });

  const defaultValues = {
    startDate: dayjs().subtract(1, "year"),
    endDate: dayjs(),
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!optionModalVisible) {
      setTimeout(() => {
        reset();
      }, 500);
    }
  }, [optionModalVisible]);

  if (
    ![types.SUBSCRIBER, types.CONTACT_US, types.VENUE_BOOKING].includes(type)
  ) {
    return <></>;
  }

  return (
    <>
      <Button
        sx={{ mr: 2 }}
        onClick={() => setOptionModalVisible(true)}
        variant="outlined"
        startIcon={<Iconify icon="file-icons:microsoft-excel" />}
      >
        Download Excel Sheet
      </Button>
      <Dialog
        open={optionModalVisible}
        onClose={() => setOptionModalVisible(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(handleSheetDownload)}
          >
            <DialogTitle id="alert-dialog-title">
              Download Excel Sheet
            </DialogTitle>
            <DialogContent>
              <Stack gap={2} pt={2}>
                <RHFDatePicker
                  label="Start Date"
                  name="startDate"
                  size="small"
                />
                <RHFDatePicker label="End Date" name="endDate" size="small" />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ mb: 1, px: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setOptionModalVisible(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </Box>
      </Dialog>
    </>
  );
}
