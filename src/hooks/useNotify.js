import React from "react";

export const notiRef = React.createRef();

export const useAlert = () => {
  if (notiRef && notiRef.current) {
    return {
      toastSuccess: notiRef.current.toastSuccess,
      toastError: notiRef.current.toastError,
      toastInfo: notiRef.current.toastInfo,
      toastWarning: notiRef.current.toastWarning,
    };
  }

  return {
    toastSuccess: () => {},
    toastError: () => {},
    toastInfo: () => {},
    toastWarning: () => {},
  };
};
