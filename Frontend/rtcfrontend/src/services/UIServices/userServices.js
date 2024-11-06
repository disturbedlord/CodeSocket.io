import axios from "axios";
import { BACKENDURL } from "../../components/Common/Constants";
class UserServices {
  static loginService = async (data) => {
    let response = await axios
      .post(BACKENDURL + "/users/login", {
        emailId: data.emailId,
        password: data.password,
      })
      .then((res) => {
        if (
          res !== undefined &&
          res.status === 200 &&
          res.data.data !== undefined
        ) {
          return res;
        }
      })
      .catch((ex) => ex.response);
    return response;
  };

  static registerService = async (data) => {
    let response = await axios
      .post(BACKENDURL + "/users/register", {
        emailId: data.emailId,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((ex) => ex.response);
    return response;
  };

  static logoutService = async () => {
    let logout = await axios
      .delete(BACKENDURL + "/users/logout")
      .then((res) => {
        if (res.status === 200) return true;
      })
      .catch((ex) => {
        console.log("Logout Exception : ", ex);
        return false;
      });
    return logout;
  };
}

export default UserServices;
