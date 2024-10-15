import axios from "axios";
class UserServices {
  loginService = async (data) => {
    let response = await axios
      .post("/users/login", {
        emailId: data.emailId,
        password: data.password,
      })
      .then((res) => {
        return res;
      })
      .catch((ex) => ex.response);
    return response;
  };

  registerService = async (data) => {
    let response = await axios
      .post("/users/register", {
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
}

export default UserServices;
