import { TableCell } from "@mui/material";
import _ from "lodash";
import { RHFTextField } from "src/components/hook-form";
import { getDDMMYYY, getFormattedDate, isIsoDate } from "src/utils/commons";
import * as Yup from "yup";

const sectionTitle = "Inquiries";
//API
const apiHook = "contactUsApi";
const endPoints = {
  get: "contactUs/getContactUs",
  create: "contactUs/create",
};
//TABLE
const enablePagination = true;
const tableHead = [
  { id: "createdAt", label: "Date Created", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "contact", label: "Contact", alignRight: false },
  { id: "message", label: "Message", alignRight: false },
  { id: null, label: "Actions", alignRight: true },
];
const tableActions = { edit: false, delete: false, create: true, view: true };
const tableRowRender = (rowData) =>
  tableHead.map((head) => {
    if (!_.has(rowData, head.id)) return;
    if (isIsoDate(rowData[head.id])) {
      return (
        <TableCell key={head.id} align="left">
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
      label: "Name",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "email",
      label: "Email",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "contact",
      label: "Contact",
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "message",
      label: "Message",
      multiline: true,
      maxRows: 3,
    },
  },
];

const formLayout = false; //Auto render layout if false or pass react element with form render

const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  name: Yup.string().required("Name is required"),
  contact: Yup.string().required("Contact is required"),
  message: Yup.string().required("Message is required"),
});
const formDefaultValues = {};

const formTitle = {
  update: "Update Inquiry",
  create: "Create Inquiry",
  view: "Inquiry Details",
};

//Read only form fields when edit/delete options are not available
const readOnlyFieldsMap = {
  createdAt: "Date Created",
  name: "Name",
  email: "Email",
  contact: "Contact number",
  message: "Message",
};

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
