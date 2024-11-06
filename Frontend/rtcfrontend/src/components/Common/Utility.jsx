export const isNull = (value) => {
  if (value === null || value === undefined || value === "") return true;
  else return false;
};

export const isTokenExpired = (tokenValidity) => {
  if (!isNull(tokenValidity)) {
    const dateToCompare = new Date(tokenValidity);
    const currentDate = new Date();

    if (dateToCompare < currentDate) {
      console.log("Token Expired !!!");
      return true;
    }
  }
  return false;
};
