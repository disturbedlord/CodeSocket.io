export const LoggerMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action); // Pass the action to the next middleware/reducer
  console.log("Next state:", store.getState());
  return result; // Return the result
};
