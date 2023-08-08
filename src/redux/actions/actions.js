import { SET_USER_DATA, SET_AUTH_TOKEN, LOGOUT } from "./types";

const actions = {
  setUserData: (userData) => (dispatch) =>
    dispatch({
      type: SET_USER_DATA,
      userData,
    }),

  setAuthToken: (authToken) => (dispatch) =>
    dispatch({
      type: SET_AUTH_TOKEN,
      authToken,
    }),

  logout: () => (dispatch) =>
    dispatch({
      type: LOGOUT,
    }),
};

export default actions;
