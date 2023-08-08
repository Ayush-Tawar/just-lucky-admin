import { useEffect, useMemo, useState } from "react";
import { apiErrorHandler, appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";
import { getFormData, includesFileType } from "src/utils/commons";
import { controller } from "src/controllers";

export default function useCommonApi({ authToken, type }) {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const notify = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const DEFAULT_PAGE_LIMIT = 50;

  const paginationState = useMemo(() => {
    const isPaginated =
      controller[type].enablePagination &&
      response &&
      _.has(response, "page") &&
      _.has(response, "totalPages") &&
      _.has(response, "limit") &&
      _.has(response, "totalResults");

    if (!isPaginated) return false;

    return {
      limit: response.limit,
      totalPages: response.totalPages,
      page: response.page,
      totalResults: response.totalResults,
    };
  }, [response]);

  const {
    get = "",
    create = "",
    update = "",
    remove = "",
  } = controller[type].endPoints;

  useEffect(() => {
    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  const apiCall = async (methodType, url, params = {}) => {
    let body = { ...params };
    let config = {};
    let isFormData = includesFileType(params);

    if (isFormData) {
      body = getFormData(body);
      config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
    }
    try {
      setIsSubmitting(true);
      const res = await appsApi[methodType](url, body, config);
      if (res && (res.status === 200 || res.status == 201)) {
        return res;
      }
      throw res;
    } catch (error) {
      notify.toastError("Oops! Something went wrong!");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async () => {
    const query = controller[type].enablePagination
      ? `?limit=${DEFAULT_PAGE_LIMIT}`
      : "";
    try {
      setIsLoading(true);
      const { data } = await appsApi.get(get + query);
      setData(data.results);
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      notify.toastError("Oops! Something went wrong!");
      console.error(error);
    }
  };

  const onCreate = async (params) => {
    const res = await apiCall("post", create, params);
    if (!res) return;
    notify.toastSuccess("Created successfully!");
    fetchData();
  };

  const onUpdate = async (params) => {
    const { id, ...rest } = params;
    const res = await apiCall("put", update + id, rest);
    if (!res) return;
    notify.toastSuccess("Updated successfully!");
    fetchData();
  };

  const onDelete = async (id) => {
    const res = await apiCall("delete", remove + id);
    if (!res) return;
    notify.toastSuccess("Deleted successfully!");
    setData((old) => old.filter((o) => o.id !== id));
  };

  const paginatedFetch = async (query = "", limit = 50, page = 1) => {
    if (!paginationState) return;
    try {
      setIsLoading(true);
      const { data } = await appsApi.get(
        get.replaceAll("?", "") +
          `?${query.replaceAll("?", "")}&limit=${limit}&page=${page}`,
      );
      setData(data.results);
      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      notify.toastError("Oops! Something went wrong!");
      console.error(error);
    }
  };

  return {
    data,
    isLoading,
    onUpdate,
    onDelete,
    onCreate,
    isSubmitting,
    fetchData,
    paginationState,
    paginatedFetch,
    apiCall,
  };
}
