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
        props.setLoggedInUserDetails(res.data);
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
      callback: async () => await CodeServices.shareCode(),
    },
    joinRoom: {
      type: "joinRoom",
      title: "Please enter a Code to join a Room",
      actionBtnText: "Join Room",
      callback: (data) => {},
    },
  };

  const LogoutUser = () =>
    UserServices.logoutService().then(() => props.LogoutUser());

  console.warn("Props:", props);
  return (
    <div
      className={`w-full p-2 shadow-md bg-[${Colors.navbarBg}] flex flex-row justify-between`}
    >
      <CText text={"codeSOCKET.IO"} size={"xl"} bold />
      <div className="flex flex-row gap-5 px-2 justify-center items-center">
        <button
          className="cursor-pointer flex flex-row items-center gap-1 underline"
          onClick={() =>
            setShowPopUp({ showPopup: true, data: PopUpContents["joinRoom"] })
          }
        >
          <MdOutlineInsertLink />
          Enter Code
        </button>
        <button
          className="cursor-pointer flex flex-row items-center gap-1 underline"
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
      <p className="cursor-pointer underline flex flex-row items-center gap-1">
        <FaUserAstronaut />
        {userData.Email}
      </p>
      <button
        className="cursor-pointer flex flex-row items-center gap-1 underline"
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
        className="cursor-pointer underline"
        onClick={() => ShowPopUp({ showPopup: true, data: "login" })}
      >
        Log In
      </button>
      <button
        className="cursor-pointer underline"
        onClick={() => ShowPopUp({ showPopup: true, data: "register" })}
      >
        Register
      </button>
    </>
  );
};

export default Navbar;
