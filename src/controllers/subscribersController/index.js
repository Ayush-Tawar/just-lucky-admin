import { TableCell } from "@mui/material";
import _ from "lodash";
import { RHFTextField } from "src/components/hook-form";
import { getFormattedDate, isIsoDate } from "src/utils/commons";
import * as Yup from "yup";

const sectionTitle = "Subscribers";
//API
const apiHook = "subscribersApi";
const endPoints = {
  get: "subscriber/get",
  create: "subscriber/create",
  update: "subscriber/update/",
  remove: "subscriber/delete/",
};
//TABLE
const enablePagination = true;
const tableHead = [
  { id: "createdAt", label: "Date Created", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: null, label: "Actions", alignRight: true },
];
const tableActions = { edit: true, delete: true, create: true };
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
      name: "email",
      label: "Email",
    },
  },
];

const formLayout = false; //Auto render layout if false or pass react element with form render

const formSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});
const formDefaultValues = {};

const formTitle = { update: "Update Subscriber", create: "Create Subscriber" };

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
