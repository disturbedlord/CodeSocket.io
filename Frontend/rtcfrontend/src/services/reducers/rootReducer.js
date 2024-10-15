import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  user: userReducer,
});

// export const store = configureStore({
//   reducer: rootReducer,
// });

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({ reducer: persistedReducer });
let persistor = persistStore(store);
export default { store, persistor };
