import Navbar from "./components/Navbar";
import "./App.css";
import MEditor from "./components/MEditor";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./services/reducers/rootReducer";
import NavbarContainers from "./containers/NavbarContainers";
import Popup from "./components/Popup";
console.warn("Store: ", store);
export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

const MainApp = () => {
  return (
    <div className="full flex flex-col">
      <NavbarContainers />
      <MEditor />
      <Footer />
    </div>
  );
};
