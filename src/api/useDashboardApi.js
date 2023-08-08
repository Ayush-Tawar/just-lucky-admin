import { useEffect, useState } from "react";
import { appsApi } from "./api";
import _ from "lodash";
import { useAlert } from "src/hooks/useNotify";

export default function useDashboardApi(token) {
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (token) getDashboardData();
  }, [token]);

  const getDashboardData = async () => {
    try {
      const res = await appsApi.get("dashBoard");
      if (res.status === 200) {
        setResponse(res.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return response;
}
