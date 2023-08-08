import { TableCell } from "@mui/material";
import _ from "lodash";
import { getFormattedDate } from "src/utils/commons";
import { getDDMMYYY, isIsoDate } from "src/utils/commons";
import * as Yup from "yup";

const sectionTitle = "Venue Bookings";
//API
const apiHook = "venueBookingApi";
const endPoints = {
  get: "venueBooking/get",
  create: "venueBooking/create",
  update: "venueBooking/update/",
  remove: "venueBooking/delete/",
};
//TABLE
const enablePagination = true;
const tableHead = [
  { id: "createdAt", label: "Date Created", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "contactNumber", label: "Contact", alignRight: false },
  { id: "preferredDate", label: "Date Preffered", alignRight: false },
  { id: "actions", label: "Actions", alignRight: true },
];
const tableActions = { edit: false, delete: false, create: false };
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
const formFields = [];

//Auto render layout if false or pass react element with form render
const formLayout = false;

const formSchema = Yup.object().shape({});
const formDefaultValues = {}; // if field not provided in default value it empty string "" will be considered as a default value

const formTitle = {
  update: "Update",
  create: "Create",
  view: "Booking Details",
};

//Read only form fields when edit/delete options are not available
const readOnlyFieldsMap = {
  createdAt: "Date Created",
  name: "Name",
  contact: "Contact number",
  email: "Email",
  noOfGuests: "No. of guests",
  occasion: "Occassion",
  preferredDate: "Preffered date",
  isRequiredFood: "Food required?",
  whatFoodLookingFor: "Type of food service",
  whatTypeOfFood: "Type of food",
  isRequiredAllergies: "Dietary requirement and/or allergies",
  allergyNotes: "Dietary requirement and/or allergies notes",
  drinkServed: "Drink served",
  isDrinkOnArrival: "Drink on arrival?",
  alcoholPackages: "Alcohol Packages?",
  isExternalDecoration: "Looking to bring external companies to decorate?",
  isEntertainmentProvideByUs: "Looking for Entertainment provided by us?",
  whatEntertainmentLookingFor: "What entertainment looking for?",
};

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
