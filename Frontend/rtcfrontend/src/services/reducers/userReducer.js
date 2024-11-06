import {
  getRoomCode,
  joinRoom,
  loginSuccess,
  logoutUser,
  resetUserStore,
  setLoggedInUserDetails,
} from "../constants";

const initialState = {
  loginSuccess: false,
  userData: {},
  tokenValidity: null,
  roomCode: null,
};

const defaultStore = {
  loginSuccess: false,
  userData: {},
  tokenValidity: null,
  roomCode: null,
};

export default function userReducer(state = initialState, actions) {
  switch (actions.type) {
    case loginSuccess:
      return { ...state, loginSuccess: true };
    case setLoggedInUserDetails:
      return {
        ...state,
        tokenValidity: new Date(Date.now() + 1 * 3600000),
        userData: {
          Email: actions.data.data.Email,
        },
      };
    case logoutUser:
      return { loginSuccess: false, userData: {} };
    case joinRoom:
      return { ...state, roomCode: actions.roomCode.code };
    case resetUserStore:
      return {
        loginSuccess: false,
        userData: {},
        tokenValidity: null,
        roomCode: null,
      };
    case getRoomCode:
      console.log("GET ROOM CODE CALLED");
      return { ...state };
    default:
      return state;
  }
}
