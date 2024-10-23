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
import {
  AuthMiddleware,
  loggerMiddleware,
} from "../../components/middleware/AuthMiddleware";

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

let store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(AuthMiddleware, loggerMiddleware),
  }
  // applyMiddleware(AuthMiddleware)
);
let persistor = persistStore(store);
export default { store, persistor };
