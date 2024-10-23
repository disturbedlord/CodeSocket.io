import {
  getRoomCode,
  joinRoom,
  loginSuccess,
  logoutUser,
  setLoggedInUserDetails,
} from "../constants";

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

export const joinRoomAction = (room) => {
  return {
    type: joinRoom,
    roomCode: room,
  };
};

export const resetUserStoreAction = () => {
  return {
    type: resetUserStore,
  };
};

export const getRoomCodeAction = () => {
  return {
    type: getRoomCode,
  };
};
