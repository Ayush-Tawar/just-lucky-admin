import { useEffect, useState } from "react";
import { appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";

export default function useMenuApi(token) {
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
      const { data } = await appsApi.get("menu/getMenus");
      setData(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async (updatedList) => {
    try {
      setIsSubmitting(true);
      const res = await Promise.all([
        ...updatedList.menuArray.map((item) => {
          const fd = new FormData();
          Object.keys(item).map((key) => {
            fd.append(key, item[key]);
          });
          return appsApi.put("menu/" + item.id, item, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }),
      ]);
      if (res.every((r) => r.status === 200)) {
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
