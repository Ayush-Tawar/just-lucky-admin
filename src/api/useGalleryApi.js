import { useEffect, useState } from "react";
import { appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";
import { promiseAllWithProgress } from "src/utils/commons";

export default function useGalleryApi(token) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const notify = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await appsApi.get("gallery/getGallerys?limit=200");
      setData(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const batchUpload = async (list) => {
    try {
      const res = await promiseAllWithProgress(
        [
          ...list.map((item) => {
            const fd = new FormData();
            Object.keys(item).map((key) => {
              fd.append(key, item[key]);
            });
            return appsApi.post("gallery/create-&-edit-single-image", item, {
              headers: { "Content-Type": "multipart/form-data" },
              timeout: 60000 * 60,
            });
          }),
        ],
        (progress) => {
          setBatchProgress(Number(progress).toFixed(2));
          if (Number(progress).toFixed(2) > 99) {
            setTimeout(() => {
              setBatchProgress(0);
            }, 1000);
          }
        },
      );
      if (res.every((r) => r.status === 200)) {
        notify.toastSuccess("Updated successfully!");
        return fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async (updatedList, deletedList) => {
    try {
      setIsSubmitting(true);
      const res = await Promise.all([
        ...updatedList.map((item) => {
          const fd = new FormData();
          Object.keys(item).map((key) => {
            fd.append(key, item[key]);
          });
          return appsApi.post("gallery/create-&-edit-single-image", item, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 60000 * 60,
          });
        }),
        ...deletedList.map((item) => appsApi.delete("gallery/" + item.id)),
      ]);
      if (res.every((r) => r.status === 200)) {
        notify.toastSuccess("Updated successfully!");
        fetchData();
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
    batchUpload,
    batchProgress,
  };
}
