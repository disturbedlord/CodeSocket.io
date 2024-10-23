import Colors from "./Common/Colors";
import { CText, CustomDiv } from "./Common/Tags";
import { LuShare2 } from "react-icons/lu";
import Popup from "./Popup";
import { useState } from "react";
import UserServices from "../services/UIServices/userServices";
import CodeServices from "../services/UIServices/codeServices";
import { MdOutlineInsertLink } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import socketService from "../services/UIServices/socketServices";

function Navbar(props) {
  const [showPopUp, setShowPopUp] = useState({
    showPopup: false,
    data: {
      title: "",
      actionBtnText: "",
      inputForms: [],
    },
  });

  const PopUpContents = {
    login: {
      type: "login",
      title: "Please Log In",
      actionBtnText: "Log In",
      callback: async (data) => {
        const res = await UserServices.loginService(data);
        if (res.status === 200) {
          console.log("Status is 200");
          props.setLoggedInUserDetails(res.data);
        } else {
          console.log("Not 200");
        }
        console.log("AVAV:", res);
        return res;
      },
    },
    register: {
      type: "register",
      title: "Please Register",
      actionBtnText: "Register",
      callback: (data) => UserServices.registerService(data),
    },
    shareCode: {
      type: "shareCode",
      title: "Share the below code with you Friends",
      actionBtnText: "Copy Code",
      callback: async () =>
        await CodeServices.shareCode()
          .then((res) => {
            if (res) {
              //const data = { code: res };
              props.joinRoom(res);
              console.log("SERVER CALLED");
              const serverData = {
                code: res["code"],
                from: "Server1",
                userId: props.user.userData.Email,
              };
              console.log(":B:", serverData);

              socketService.sendMessage("join-code", serverData);
              return res;
            } else return res;
          })
          .catch((ex) => {
            return { code: "" };
          }),
    },
    joinRoom: {
      type: "joinRoom",
      title: "Please enter a Code to join a Room",
      actionBtnText: "Join Room",
      popupData: {},
      callback: async (data) =>
        await CodeServices.validateRoomCode(data)
          .then((res) => {
            if (res) {
              props.joinRoom(data);
              console.log("CLIENT CALLED");
              const clientData = {
                code: data["code"],
                from: "Client",
                userId: props.user.userData.Email,
              };
              socketService.sendMessage("join-code", clientData);

              return true;
            } else return false;
          })
          .catch((ex) => false),
      // props.joinRoom(data),
    },
  };

  const LogoutUser = () =>
    UserServices.logoutService().then(() => props.LogoutUser());

  return (
    <div
      className={`w-full p-2 shadow-md bg-[${Colors.navbarBg}] flex flex-row justify-between`}
    >
      <CText text={"codeSOCKET.IO"} size={"xl"} bold />
      <div className="flex flex-row gap-5 px-2 justify-center items-center">
        <button
          className="cursor-pointer flex flex-row items-center gap-1 "
          onClick={() => {
            const roomCode =
              props && props.user && props.user.roomCode
                ? props.user.roomCode
                : "";
            setShowPopUp({
              showPopup: true,
              data: PopUpContents["joinRoom"],
              popupData: { code: roomCode },
            });
          }}
        >
          <MdOutlineInsertLink />
          {props.user.roomCode
            ? `Room Joined (${props.user.roomCode})`
            : "Enter Code"}
        </button>
        <button
          className="cursor-pointer flex flex-row items-center gap-1 "
          onClick={() =>
            setShowPopUp({ showPopup: true, data: PopUpContents["shareCode"] })
          }
        >
          <LuShare2 />
          Share
        </button>
        {props.user.loginSuccess ? (
          <UserDetails userData={props.user.userData} onLogout={LogoutUser} />
        ) : (
          <AuthButtons
            ShowPopUp={(data) =>
              setShowPopUp({ ...data, data: PopUpContents[data.data] })
            }
          />
        )}
      </div>
      <Popup
        popup={showPopUp}
        hidePopup={() => setShowPopUp({ ...showPopUp, showPopup: false })}
      />
    </div>
  );
}

const UserDetails = ({ userData, onLogout }) => {
  return (
    <>
      <p className="cursor-pointer flex flex-row items-center gap-1">
        <FaUserAstronaut />
        {userData.Email}
      </p>
      <button
        className="cursor-pointer flex flex-row items-center gap-1 "
        onClick={onLogout}
      >
        <IoLogOutOutline />
        Log Out
      </button>
    </>
  );
};

const AuthButtons = ({ ShowPopUp }) => {
  return (
    <>
      <button
        className="cursor-pointer "
        onClick={() => ShowPopUp({ showPopup: true, data: "login" })}
      >
        Log In
      </button>
      <button
        className="cursor-pointer "
        onClick={() => ShowPopUp({ showPopup: true, data: "register" })}
      >
        Register
      </button>
    </>
  );
};

export default Navbar;
