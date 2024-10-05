import { is_Login } from "../constants";

export const isLogin = (data) => {
  return { type: is_Login };
};
