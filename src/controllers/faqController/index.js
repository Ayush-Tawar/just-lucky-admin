import { Grid, TableCell } from "@mui/material";
import _ from "lodash";
import { RHFTextField } from "src/components/hook-form";
import RHFEditor from "src/components/hook-form/RHFEditor";
import * as Yup from "yup";

const sectionTitle = "FAQ";
//API
const apiHook = "faqApi";
const endPoints = {
  get: "faq/getFaqs?limit=100",
  create: "faq/createFaq",
  update: "faq/updateFaq/",
  remove: "faq/deleteFaq/",
};
//TABLE
const enablePagination = false;
const tableHead = [
  { id: "question", label: "Question", alignRight: false },
  { id: "action", label: "Actions", alignRight: true },
];
const tableActions = { edit: true, delete: true, create: true };
const tableRowRender = (rowData) =>
  tableHead.map((head) => {
    if (!_.has(rowData, head.id)) return;
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
      name: "question",
      label: "FAQ Question",
      multiline: true,
      maxRows: 3,
    },
  },
  {
    component: RHFTextField,
    formProps: {
      name: "answer",
      label: "FAQ Answer",
      multiline: true,
      maxRows: 8,
    },
  },
];

//Auto render layout if false or pass react element with form render
const formLayout = (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <RHFTextField
        name="question"
        label="FAQ Question"
        multiline
        maxRows={3}
      />
    </Grid>
    <Grid item xs={12}>
      <RHFEditor name="answer" label="FAQ Answer" />
    </Grid>
  </Grid>
);

const formSchema = Yup.object().shape({
  question: Yup.string().required("Question is required!"),
  answer: Yup.string().required("Answer is required!"),
});
const formDefaultValues = {}; // if field not provided in default value it empty string "" will be considered as a default value

const formTitle = { update: "Update FAQ", create: "Create FAQ" };

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
  sectionTitle,
  endPoints,
  tableRowRender,
  enablePagination,
  formDefaultValues,
  readOnlyFieldsMap,
};
