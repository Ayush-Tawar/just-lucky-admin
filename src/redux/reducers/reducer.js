import { SET_USER_DATA, SET_AUTH_TOKEN, LOGOUT } from "../actions/types";

const initialState = {
  authToken: null,
  userData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      };

    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken,
      };

    case LOGOUT:
      return {
        ...state,
        authToken: null,
        userData: {},
      };

    default:
      return state;
  }
};

export default reducer;
