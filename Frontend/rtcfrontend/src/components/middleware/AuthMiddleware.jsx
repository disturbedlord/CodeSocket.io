import { resetUserStoreAction } from "../../services/actions/userActions";
import { isTokenExpired } from "../Common/Utility";
import { useDispatch } from "react-redux";

export const AuthMiddleware = (store) => (next) => (action) => {
  const expiryTokenValidaty = store.getState().user.tokenValidity;
  console.warn("AuthMidd", expiryTokenValidaty, store.getState());
  if (isTokenExpired(expiryTokenValidaty)) {
    const dispatch = useDispatch();
    dispatch(resetUserStoreAction());
    console.warn("AuthMiddleware", expiryTokenValidaty);
  }
  return next(action);
};
