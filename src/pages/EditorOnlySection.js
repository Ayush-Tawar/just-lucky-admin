import React, { useMemo, useState } from "react";
import Page from "../components/Page";
import { Stack, Container, Button, Typography } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuth } from "src/utils/AuthContext";
import _ from "lodash";
import CommonSpinner from "src/components/CommonSpinner";
import { LoadingButton } from "@mui/lab";
import { controller } from "src/controllers";

function EditorOnlySection({ title, cmsTitle, type }) {
  const [editor, setEditor] = useState();
  const { apis } = useAuth();
  const api = apis[controller[type]["apiHook"]];
  const { onUpdate, isSubmitting, isLoading, data } = api;

  const currentData = useMemo(() => {
    if (!_.isEmpty(data) && data.length > 0) {
      return data.find((d) => d.title === cmsTitle);
    }
  }, [data, cmsTitle]);

  const onSave = () => {
    onUpdate({
      ...currentData,
      content: editor.getData(),
    });
  };

  return (
    <Page>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            onClick={onSave}
          >
            Save
          </LoadingButton>
        </Stack>
        {isLoading ? (
          <CommonSpinner />
        ) : (
          <CKEditor
            data={currentData?.content ?? ""}
            onReady={(e) => setEditor(e)}
            editor={ClassicEditor}
          />
        )}
      </Container>
    </Page>
  );
}

export default EditorOnlySection;
