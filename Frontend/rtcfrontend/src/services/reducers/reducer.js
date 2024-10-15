import { loginSuccess, logoutUser, setLoggedInUserDetails } from "../constants";

const initialState = {
  loginSuccess: false,
  userData: {},
  tokenValidity: null,
};

export default function userReducer(state = initialState, actions) {
  switch (actions.type) {
    case loginSuccess:
      return { ...state, loginSuccess: true };
    case setLoggedInUserDetails:
      return {
        ...state,
        tokenValidity: new Date(Date.now() + 72000),
        userData: {
          Email: actions.data.data.Email,
        },
      };
    case logoutUser:
      return { loginSuccess: false, userData: {} };
    default:
      return state;
  }
}
