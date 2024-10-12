import Colors from "./Common/Colors";
import { CText } from "./Common/Tags";
import { LuShare2 } from "react-icons/lu";
import Popup from "./Popup";
import { useState } from "react";
import UserServices from "../services/UIServices/userServices";
const _userService = new UserServices();

const PopUpContents = {
  login: {
    title: "Please Log In",
    actionBtnText: "Log In",
    inputForms: [],
    callback: (data) => _userService.loginService(data),
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

function Navbar(props) {
  const [showPopUp, setShowPopUp] = useState({
    showPopup: false,
    data: {
      title: "",
      actionBtnText: "",
      inputForms: [],
    },
  });

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
        <button
          className="cursor-pointer underline"
          onClick={() =>
            setShowPopUp({ showPopup: true, data: PopUpContents["login"] })
          }
        >
          Log In
        </button>
        <button
          className="cursor-pointer underline"
          onClick={() =>
            setShowPopUp({ showPopup: true, data: PopUpContents["register"] })
          }
        >
          Register
        </button>
      </div>
      <Popup
        popup={showPopUp}
        hidePopup={() => setShowPopUp({ ...showPopUp, showPopup: false })}
      />
    </div>
  );
}

export default Navbar;
