import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { io } from "socket.io-client";
import _ from "lodash";
import QUERY_KEYS from "src/_mock/queryKeys";
import { API_BASE_URL } from "src/api/api";

// let socket = io(API_BASE_URL, {
//   auth: {
//     token: "admin",
//   },
// });

export const useSocket = (token) => {
  // const qc = useQueryClient();
  // useEffect(() => {
  //   if (token) {
  //     handleSocket();
  //   }
  // }, [token]);
  // const handleSocket = async () => {
  //   // console.log("handling socket", socket);
  //   if (!socket) {
  //     return;
  //   }
  //   socket.on("connect", () => {
  //     // console.log("Connected to Socket with socket id", socket.id);
  //     socket.emit("connectUser", (data) => {
  //       // console.log("Socket Connected", data);
  //     });
  //   });
  //   socket.on("admin_db_update", (data) => {
  //     qc.invalidateQueries(QUERY_KEYS.DASHBOARD_DATA);
  //     qc.invalidateQueries(QUERY_KEYS.USERS_LIST);
  //   });
  // };
};
