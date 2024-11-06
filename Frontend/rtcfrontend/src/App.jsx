import { PersistGate } from "redux-persist/integration/react";

import "./App.css";
import MEditor from "./components/MEditor";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import NavbarContainers from "./containers/NavbarContainers";
import { useEffect } from "react";
import { socket } from "./components/Socket";
import Store from "./services/reducers/rootReducer";
import Home from "./components/Home";
import { isNull } from "./components/Common/Utility";
import HomeContainer from "./containers/HomeContainer";
export default function App() {
  // const CheckSession = async () => {
  //   console.log("Check Session : ", Store.store.getState().user);
  //   const _store = await Store.store.getState();
  //   if (
  //     _store.user["tokenValidity"] === undefined ||
  //     new Date(_store.user.tokenValidity) < new Date()
  //   ) {
  //     //await Store.persistor.purge();
  //     Store.persistor.flush().then(() => {
  //       console.log("Flush Complete");
  //       return Store.persistor.purge();
  //     });
  //     console.log("Purge");
  //   }
  // };

  // CheckSession();

  useEffect(() => {
    function onConnect() {
      console.log("onConnect");
    }
    console.log("REDUX POERSITI : ", Store.store.getState());
    //Validate Auth Token on Page Refresh
    socket.on("connect", onConnect);
    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <HomeContainer />
      </PersistGate>
    </Provider>
  );
}
