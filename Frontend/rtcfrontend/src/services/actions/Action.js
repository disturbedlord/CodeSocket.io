import { loginSuccess, logoutUser, setLoggedInUserDetails } from "../constants";

export const loginSuccessAction = (data) => {
  return { type: loginSuccess };
};

export const setLoggedInUserDetailsAction = (data) => {
  return { type: setLoggedInUserDetails, data: data };
};

export const logoutUserAction = () => {
  return {
    type: logoutUser,
  };
};
