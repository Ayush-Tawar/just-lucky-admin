import React, { createContext, useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GlobalAlert from "src/components/GlobalAlert";
import { useEffectSkipFirst } from "src/hooks/useEffectSkipFirst";
import { notiRef } from "src/hooks/useNotify";
import actions from "src/redux/actions/actions";
import useApiProvider from "./useApiProvider";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { authToken, userData } = useSelector((state) => state.reducer);
  const navigate = useNavigate();
  useEffectSkipFirst(() => navigate("/", { replace: true }), [authToken]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  const apis = useApiProvider({ authToken: authToken });

  const value = {
    authToken: authToken,
    userData: userData,
    handleLogout: handleLogout,
    apis,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthContext.Provider value={value}>
        <GlobalAlert ref={notiRef} />
        {children}
      </AuthContext.Provider>
    </LocalizationProvider>
  );
};
