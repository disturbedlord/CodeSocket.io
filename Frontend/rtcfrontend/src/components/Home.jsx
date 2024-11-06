import { useEffect } from "react";
import NavbarContainers from "../containers/NavbarContainers";
import Footer from "./Footer";
import MEditor from "./MEditor";
import MEditorContainer from "../containers/MEditorContainer";
import { isTokenExpired, validateAuthToken } from "./Common/Utility";

function Home(props) {
  const ValidateToken = () => {
    console.warn("HOMECONTROLLER : ", props);
    const userStore = props.user;
    const tokenValidity = userStore.tokenValidity;
    if (isTokenExpired(tokenValidity)) {
      props.resetUserStore();
    }
  };

  useEffect(() => {
    ValidateToken();
    console.warn("THIS>PROPS : ", props);
  }, []);

  return (
    <div className="full flex flex-col">
      <NavbarContainers />
      <MEditorContainer />
      <Footer />
    </div>
  );
}

export default Home;
