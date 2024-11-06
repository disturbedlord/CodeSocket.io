import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { AuthMiddleware } from "../../components/middleware/AuthMiddleware";
import { LoggerMiddleware } from "../../components/middleware/LoggerMiddleware";
import EditorReducer from "./editorReducer";
import editorReducer from "./editorReducer";

const rootReducer = combineReducers({
  user: userReducer,
  editor: editorReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(AuthMiddleware, LoggerMiddleware),
});
let persistor = persistStore(store);
export default { store, persistor };
