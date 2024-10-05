import { is_Login, is_Register, is_Share } from "../constants";

const initialState = {
  isLogin: false,
  isRegister: false,
  isShare: false,
};

export default function userReducer(state = initialState, actions) {
  switch (actions.type) {
    case is_Login:
      return { ...state, isLogin: !state.isLogin };
    case is_Register:
      return { ...state, isRegister: !state.isRegister };
    case is_Share:
      return { ...state, isShare: !state.isShare };
    default:
      return state;
  }
}
