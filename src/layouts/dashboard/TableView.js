// material
import {
  Card,
  Stack,
  Container,
  Typography,
  Button,
  TableRow,
  TableCell,
  Grid,
  Drawer,
  Box,
  IconButton,
} from "@mui/material";
// components
import Page from "../../components/Page";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "src/utils/AuthContext";
import _ from "lodash";
import { useMemo, useState } from "react";
import Iconify from "src/components/Iconify";
import CommonTable from "src/components/CommonTable";
import MoreMenu from "src/components/CommonTable/MoreMenu";
import { controller, types } from "src/controllers";
import CommonForm from "src/layouts/dashboard/CommonForm";
import dayjs from "dayjs";
import {
  getDDMMYYY,
  getFormattedDate,
  getValueFromObject,
  isIsoDate,
} from "src/utils/commons";
import Scrollbar from "src/components/Scrollbar";
import ExportExcel from "src/components/ExportExcel";

export default function TableView({ type }) {
  const [openForm, setOpenForm] = useState(false);
  const isEditMode = typeof openForm == "object";
  const { apis } = useAuth();
  const api = apis[controller[type]["apiHook"]];
  const tableHead = controller[type]["tableHead"];
  const tableActions = controller[type]["tableActions"];
  const sectionTitle = controller[type]["sectionTitle"];
  const disablePagination = !controller[type]["enablePagination"];
  const isReadOnly =
    (!tableActions.delete && !tableActions.create && !tableActions.edit) ||
    tableActions.view;

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
  const onEdit = (item) => {
    setOpenForm(item);
  };

  return (
    <Page title={sectionTitle}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {sectionTitle}
          </Typography>
          <Box>
            {!_.isEmpty(data) && <ExportExcel type={type} />}
            {tableActions?.create && !openForm && (
              <Button
                onClick={() => setOpenForm(true)}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add
              </Button>
            )}
          </Box>
        </Stack>

        {openForm && isReadOnly && (
          <ReadOnlyView
            openForm={openForm}
            type={type}
            setOpenForm={setOpenForm}
          />
        )}

        {openForm && !isReadOnly ? (
          <Card>
            <Form
              mode={isEditMode ? "UPDATE" : "CREATE"}
              isSubmitting={isSubmitting}
              openForm={openForm}
              setOpenForm={setOpenForm}
              onUpdate={onUpdate}
              onCreate={onCreate}
              onDelete={onDelete}
              type={type}
            />
          </Card>
        ) : (
          <Card>
            <CommonTable
              api={api}
              loading={isLoading}
              tableTitle={type}
              tableHead={tableHead}
              list={data || []}
              disablePagination={disablePagination}
              RowItem={(params) => {
                return (
                  <RowItem
                    {...params}
                    onEdit={onEdit}
                    type={type}
                    onDelete={onDelete}
                    isReadOnly={isReadOnly}
                  />
                );
              }}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}

const RowItem = ({ row, onEdit, onDelete, type, isReadOnly }) => {
  const { id } = row;
  const tableActions = controller[type]["tableActions"];
  const tableRowRender = controller[type]["tableRowRender"];

  const menuProps = {};
  if (tableActions.edit) {
    menuProps.onEdit = () => onEdit(row);
  }
  if (tableActions.delete) {
    menuProps.onDelete = () => onDelete(id);
  }
  if (isReadOnly) {
    menuProps.onView = () => onEdit(row);
  }

  return (
    <TableRow hover key={id}>
      {tableRowRender(row)}
      <TableCell align="right">
        <MoreMenu {...menuProps} />
      </TableCell>
    </TableRow>
  );
};

const Form = (props) => {
  const {
    openForm,
    setOpenForm,
    isSubmitting,
    mode,
    onUpdate,
    onCreate,
    onDelete,
    type,
  } = props;
  const formFieldsArray = controller[type]["formFields"];
  const formSchema = controller[type]["formSchema"];
  const formTitle = controller[type]["formTitle"];
  const formLayout = controller[type]["formLayout"];
  const formDefaultValues = controller[type]["formDefaultValues"];

  const onSubmit = async (vals) => {
    let params = {};
    formFieldsArray.map((f) => {
      if (vals[f.formProps.name] instanceof dayjs) {
        params[f.formProps.name] = vals[f.formProps.name].toDate();
        return;
      }
      params[f.formProps.name] = getValueFromObject(vals, f.formProps.name);
    });

    if (mode == "CREATE") {
      onCreate(params);
    }
    if (mode == "UPDATE") {
      onUpdate({
        ...params,
        id: openForm.id,
      });
    }
    setOpenForm(false);
  };

  let defaultValues = useMemo(() => {
    let params = {};
    if (mode === "UPDATE") {
      formFieldsArray.map((f) => {
        if (isIsoDate(openForm[f.formProps.name])) {
          //Parse date
          params[f.formProps.name] = dayjs(
            getValueFromObject(openForm, f.formProps.name),
          );
          return;
        }
        params[f.formProps.name] = getValueFromObject(
          openForm,
          f.formProps.name,
        );
      });
      return params;
    }
    formFieldsArray.map((f) => {
      params[f.formProps.name] = getValueFromObject(
        formDefaultValues,
        f.formProps.name,
      );
    });
    return params;
  }, [openForm]);

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  return (
    <CommonForm
      formTitle={mode === "UPDATE" ? formTitle.update : formTitle.create}
      onClose={() => setOpenForm(false)}
      methods={methods}
      onSubmit={onSubmit}
      onDelete={onDelete}
      isSubmitting={isSubmitting}
    >
      {formLayout === false ? (
        <Grid container spacing={3}>
          {formFieldsArray.map((field, index) => (
            <Grid item xs={6} key={field.name || index}>
              <field.component {...field.formProps} />
            </Grid>
          ))}
        </Grid>
      ) : (
        formLayout
      )}
    </CommonForm>
  );
};

const ReadOnlyView = (props) => {
  const { openForm, setOpenForm, type } = props;
  const formTitle = controller[type]["formTitle"];
  const readOnlyFieldsMap = controller[type]["readOnlyFieldsMap"];

  return (
    <Drawer
      anchor="right"
      open={openForm}
      onCloseSidebar={() => setOpenForm(false)}
      PaperProps={{
        sx: { width: 500 },
      }}
    >
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
        <Box sx={{ mb: 5, mx: 4 }}>
          <Stack direction="row" sx={{ mt: 4, mb: 5 }} alignItems="center">
            <Typography variant="h4" flex={1}>
              {formTitle.view}
            </Typography>
            <IconButton onClick={() => setOpenForm(false)}>
              <Iconify icon="codicon:chrome-close" width={30} height={30} />
            </IconButton>
          </Stack>
          <Stack spacing={2} pb={20}>
            {Object.keys(readOnlyFieldsMap).map((fieldKey) => {
              if (!openForm[fieldKey]) {
                return <></>;
              }
              return (
                <Stack key={fieldKey}>
                  <Typography variant="caption">
                    {readOnlyFieldsMap[fieldKey]}
                  </Typography>
                  <Typography>
                    {isIsoDate(openForm[fieldKey])
                      ? getDDMMYYY(openForm[fieldKey])
                      : openForm[fieldKey]}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </Scrollbar>
    </Drawer>
  );
};
