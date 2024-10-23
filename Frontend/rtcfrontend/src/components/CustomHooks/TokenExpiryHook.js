import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";

const useTokenExpiryCheck = () => {
  const history = useHistory();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("authToken");
          history.push("/login"); // Redirect to login
        }
      }
    };

    // Check immediately
    checkToken();

    // Set interval to check every minute (60000 milliseconds)
    const intervalId = setInterval(checkToken, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [history]);
};

export default useTokenExpiryCheck;
