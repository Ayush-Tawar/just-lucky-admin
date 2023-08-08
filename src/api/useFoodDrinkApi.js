import { useEffect, useState } from "react";
import { appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";

export default function useFoodDrinkApi(token) {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const notify = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let res = await appsApi.get("foodDrink/getAllFoodDrinkImages?limit=200");
      setImages(res?.data?.results);
      res = await appsApi.get("foodDrink/getfoodDrinks");
      setData(res?.data?.results);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async (updatedList, deletedList, otherData) => {
    try {
      setIsSubmitting(true);
      const res = await Promise.all([
        appsApi.put("foodDrink/update/" + otherData.id, otherData),
        ...updatedList.map((item) => {
          const fd = new FormData();
          Object.keys(item).map((key) => {
            fd.append(key, item[key]);
          });
          return appsApi.post("foodDrink/create-&-edit-single-image", item, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 60000 * 60,
          });
        }),
        ...deletedList.map((item) =>
          appsApi.delete("foodDrink/foodDrinkImage/" + item.id),
        ),
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
    data: {
      images,
      data,
    },
    isLoading,
    onUpdate,
    isSubmitting,
  };
}
