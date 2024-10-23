import { useEffect } from "react";
import NavbarContainers from "../containers/NavbarContainers";
import Footer from "./Footer";
import MEditor from "./MEditor";
import MEditorContainer from "../containers/MEditorContainer";

const Home = () => {
  //   const validateSession = async () => {
  //     console.log("Check Session : ", Store.store.getState().user);
  //     const _store = await Store.store.getState();
  //     if (
  //       _store.user["tokenValidity"] === undefined ||
  //       new Date(_store.user.tokenValidity) < new Date()
  //     ) {
  //       //await Store.persistor.purge();
  //       Store.persistor.flush().then(() => {
  //         console.log("Flush Complete");
  //         return Store.persistor.purge();
  //       });
  //       console.log("Purge");
  //     }
  //   };

  //   useEffect = () => {
  //     validateSession();
  //   };

  return (
    <div className="full flex flex-col">
      <NavbarContainers />
      <MEditorContainer />
      <Footer />
    </div>
  );
};

export default Home;
