import { notiRef } from "src/hooks/useNotify";
import Axios from "axios";
import _ from "lodash";
import { API_BASE_URL } from "src/utils/config";
import { store } from "src/redux/store/store";
import actions from "src/redux/actions/actions";

const apiErrorHandler = (error) => {
  const { response } = error;

  if (response?.message && Array.isArray(response?.message)) {
    notiRef?.current?.toastError(
      response?.message[0] || "Oops! Something went wrong!",
    );
    return;
  }
  if (response?.message && typeof response?.message === "string") {
    notiRef?.current?.toastError(response?.message);
    return;
  }
  if (response && response.data) {
    if (response.data.Message) {
      notiRef &&
        notiRef.current &&
        notiRef?.current?.toastError(response.data.Message);
    }
    if (response.data.message) {
      notiRef &&
        notiRef.current &&
        notiRef?.current?.toastError(response.data.message);
    }
  }
};

export const appsApi = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

appsApi.interceptors.request.use((config) => {
  const token = store ? store.getState().reducer.authToken : "";
  if (token?.access?.token) {
    config.headers.Authorization = `Bearer ${token?.access?.token}`;
  }
  return config;
});

appsApi.interceptors.response.use((response) => {
  responseHandler(response);
  return response;
}, apiErrorHandler);

const responseHandler = (response) => {
  const res = response;
  if (res.status && [1, 200, 201].includes(res.status)) {
    return res;
  }
  if (res.statusCode === 401) {
    store.dispatch(actions.logout());
    notiRef?.current?.toastError(res.message || "Oops! You are Unauthorized!");
    return;
  }
  if (res.message && Array.isArray(res.message)) {
    notiRef?.current?.toastError(
      res.message[0] || "Oops! Something went wrong!",
    );
    return;
  }
  if (res.message && typeof res.message === "string") {
    notiRef?.current?.toastError(res.message);
    return;
  }
};
