import { useEffect, useState } from "react";
import { appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";

export default function useVenueApi(token) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const notify = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await appsApi.get("venue/getVenues");
      setData(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async (params) => {
    try {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(params).map((key) => {
        fd.append(key, params[key]);
      });
      const res = await appsApi.put("venue/" + params.id, params, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        setTimeout(() => {
          notify.toastSuccess("Updated successfully!");
          fetchData();
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    isLoading,
    onUpdate,
    isSubmitting,
  };
}
