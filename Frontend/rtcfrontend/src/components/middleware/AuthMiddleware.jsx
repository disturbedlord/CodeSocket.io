import Store from "../../services/reducers/rootReducer";

export const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action); // Pass the action to the next middleware/reducer
  console.log("Next state:", store.getState());
  return result; // Return the result
};

export const AuthMiddleware = (store) => (next) => (action) => {
  const expiryTokenValidaty = store.getState().user.tokenValidity;
  console.warn("AuthMidd", expiryTokenValidaty);
  // if (
  //   expiryTokenValidaty !== undefined &&
  //   new Date(expiryTokenValidaty) < new Date()
  // ) {
  //   //await Store.persistor.purge();
  //   Store.persistor.flush().then(() => {
  //     console.log("Flush Complete");
  //     return Store.persistor.purge();
  //   });
  //   console.log("Purge");
  // }
  return next(action);
};
