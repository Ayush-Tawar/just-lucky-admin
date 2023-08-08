import { Chip, TableCell } from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";
import {
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from "src/components/hook-form";
import RHFUpload from "src/components/hook-form/RHFUpload";
import { getDDMMYYY, getFormattedDate, isIsoDate } from "src/utils/commons";
import * as Yup from "yup";

const sectionTitle = "Events";
//API
const apiHook = "eventsApi";
const endPoints = {
  get: "events/getEvents",
  create: "events/create",
  update: "events/update/",
  remove: "events/",
};
//TABLE
const enablePagination = true;
const tableHead = [
  { id: "createdAt", label: "Date Created", alignRight: false },
  { id: "title", label: "Title", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "eventStartDate", label: "Event Date", alignRight: false },
  { id: "eventType", label: "Event Type", alignRight: false },
  { id: "isHighLight", label: "Highlight", alignRight: false },
  { id: null, label: "Actions", alignRight: true },
];
const tableActions = { edit: true, delete: true, create: true };
const tableRowRender = (rowData) =>
  tableHead.map((head) => {
    if (!_.has(rowData, head.id)) return;
    if (head.id === "eventStartDate") {
      return (
        <TableCell key={head.id} align="left">
          {getDDMMYYY(rowData[head.id])}
        </TableCell>
      );
    }
    if (head.id === "isHighLight") {
      return (
        <TableCell key={head.id} align="left">
          <Chip
            label={rowData[head.id] ? "Yes" : "No"}
            color={rowData[head.id] ? "primary" : "default"}
            variant="filled"
          />
        </TableCell>
      );
    }
    if (isIsoDate(rowData[head.id])) {
      return (
        <TableCell key={head.id} align="left" width={190}>
          {getFormattedDate(rowData[head.id])}
        </TableCell>
      );
    }
    return (
      <TableCell key={head.id} align="left">
        {rowData[head.id]}
      </TableCell>
    );
  });

//FORMS
const formFields = [
  {
    component: RHFTextField,
    formProps: {
      name: "name",
      label: "Event Name",
    },
  },
  {
    component: RHFSwitch,
    formProps: {
      name: "isHighLight",
      label: "Event Highlight",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "title",
      label: "Event Title",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "description",
      label: "Event Description",
      multiline: true,
      maxRows: 6,
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "link",
      label: "Event Link",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "price",
      label: "Price (example: £10 or TBA)",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "bookingFee",
      label: "Add Booking Fee",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "startTime",
      label: "Event Start Time (eg: 08:30pm)",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "endTime",
      label: "Event End Time (eg: 08:30pm)",
    },
  },
  {
    component: RHFSelect,
    formProps: {
      name: "age",
      label: "Select Age",
      options: ["don't show", "18+", "all ages"],
    },
  },
  {
    component: RHFDatePicker,
    formProps: {
      name: "displayEventListingFrom",
      label: "Display Event Listing From",
    },
  },
  {
    component: RHFDatePicker,
    formProps: {
      name: "eventStartDate",
      label: "Event Date",
    },
  },
  {
    component: RHFSelect,
    formProps: {
      name: "eventType",
      label: "Event Type",
      options: [
        "Private Event",
        "Cancelled",
        "Sold Out",
        "Live",
        "Completed",
        "Cloned",
      ],
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "performer",
      label: "Performer (Google Structured Data)",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "organiser",
      label: "Organizer (Google Structured Data)",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "organizerUrl",
      label: "Organizer Page URL (Google Structured Data)",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "seoTitle",
      label: "SEO Title",
      helperText:
        "Describe in 70 characters or less, Search engines show this title in search results",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "seoDescription",
      label: "SEO Description",
      multiline: true,
      helperText:
        "Describe in 160 characters or less, Search engines show this description in search results",
      maxRows: 6,
    },
  },
  {
    component: RHFUpload,
    formProps: {
      name: "eventImage",
      label: "Event Image",
      buttonText: "Upload Event Image",
      aspectRatio: 419 / 273,
      cropBeforeUpload: true,
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "eventImageAltText",
      label: "Event image alt text",
      helperText: "Describe the event image in 125 characters or less",
    },
  },
  {
    component: RHFUpload,
    formProps: {
      name: "highlightImage",
      label: "Highlight Image",
      buttonText: "Upload Highlight Image",
      aspectRatio: 417 / 555,
      cropBeforeUpload: true,
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "highlightImageAltText",
      label: "Highlight image alt text",
      helperText: "Describe highlight image in 125 characters or less",
    },
  },
];

const formLayout = false; //Auto render layout if false or pass react element with form render

const formSchema = Yup.object().shape({
  title: Yup.string().required("Event title is required"),
  price: Yup.string().required("Event price is required"),
  eventStartDate: Yup.mixed().test(
    "required",
    "Event start date is required",
    (value) => !_.isEmpty(value) && value instanceof dayjs,
  ),
  eventType: Yup.string().required("Event type is required"),
  name: Yup.string().required("Event name is required"),
  description: Yup.string().required("Event description is required"),
  link: Yup.string().required("Event link required"),
  bookingFee: Yup.string().required("Booking fee is required"),
  startTime: Yup.string().required("Start time required"),
  endTime: Yup.string().required("End time required"),
  age: Yup.string().required("Age is required"),
  displayEventListingFrom: Yup.mixed().test(
    "required",
    "Event listing date is required",
    (value) => !_.isEmpty(value) && value instanceof dayjs,
  ),
  performer: Yup.string().max(
    125,
    "Description should not be more than 125 characters",
  ),
  organiser: Yup.string().max(
    125,
    "Description should not be more than 125 characters",
  ),
  organizerUrl: Yup.string(),
  seoTitle: Yup.string().max(
    70,
    "Seo title should not be more than 70 characters",
  ),
  seoDescription: Yup.string().max(
    160,
    "Seo description should not be more than 160 characters",
  ),
  isHighLight: Yup.bool(),
  eventImage: Yup.mixed().test(
    "required",
    "Event image is required",
    (value) => !_.isEmpty(value) || value instanceof File,
  ),
  eventImageAltText: Yup.string(),
  highlightImage: Yup.mixed(),
  highlightImageAltText: Yup.string(),
});
const formDefaultValues = {
  age: "don't show",
  eventType: "Live",
  eventStartDate: dayjs(),
  displayEventListingFrom: dayjs(),
  isHighLight: false,
};

const formTitle = { update: "Update Event", create: "Create Event" };

//Read only form fields when not edit/delete available
const readOnlyFieldsMap = {};

export default {
  apiHook,
  formFields,
  formLayout,
  tableHead,
  tableActions,
  formSchema,
  formTitle,
  formDefaultValues,
  sectionTitle,
  endPoints,
  enablePagination,
  tableRowRender,
  readOnlyFieldsMap,
};
