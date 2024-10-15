import Colors from "./Common/Colors";
import { CText } from "./Common/Tags";
import { LuShare2 } from "react-icons/lu";
import Popup from "./Popup";
import { useState } from "react";
import UserServices from "../services/UIServices/userServices";
import LocalStorage from "../services/localStorageService";
const _userService = new UserServices();

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
      title: "Please Log In",
      actionBtnText: "Log In",
      inputForms: [],
      callback: async (data) => {
        const res = await _userService.loginService(data);
        console.log("AVAV:", res);

        if (
          res !== undefined &&
          res.status === 200 &&
          res.data.data !== undefined
        ) {
          props.setLoggedInUserDetails(res.data);
          console.log("AVAV:", res);
        }
        return res;
      },
    },
    register: {
      title: "Please Register",
      actionBtnText: "Register",
      inputForms: [],
      callback: (data) => _userService.registerService(data),
    },
    shareCode: {
      title: "Share the below code with you Friends",
      actionBtnText: "Copy Code",
      inputForms: [],
      callback: () => {
        console.log("Share");
      },
    },
  };

  const LogoutUser = () => {
    props.LogoutUser();
  };

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
            setShowPopUp({ showPopup: true, data: PopUpContents["shareCode"] })
          }
        >
          <LuShare2 />
          Code Share
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
      <p className="cursor-pointer underline">{userData.Email}</p>
      <button className="underline" onClick={onLogout}>
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
