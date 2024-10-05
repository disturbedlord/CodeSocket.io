import Colors from "./Common/Colors";
import { CText } from "./Common/Tags";
import { LuShare2 } from "react-icons/lu";
import Popup from "./Popup";
import { useState } from "react";

function Navbar(props) {
  const [showPopUp, setShowPopUp] = useState(false);

  console.warn("Props:", props);
  return (
    <div
      className={`w-full p-2 shadow-md bg-[${Colors.navbarBg}] flex flex-row justify-between`}
    >
      <CText text={"codeSOCKET.IO"} size={"xl"} bold />
      <div className="flex flex-row gap-5 px-2 justify-center items-center">
        <button className="cursor-pointer flex flex-row items-center gap-1 underline">
          <LuShare2 />
          Code Share
        </button>
        <button
          className="cursor-pointer underline"
          onClick={() => setShowPopUp(true)}
        >
          Log In
        </button>
        <button className="cursor-pointer underline">Register</button>
      </div>
      <Popup showPopup={showPopUp} hidePopup={() => setShowPopUp(false)} />
    </div>
  );
}

export default Navbar;
