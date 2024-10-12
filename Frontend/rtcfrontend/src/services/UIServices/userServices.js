import axios from "axios";
class UserServices {
  loginService = async (data) => {
    await axios
      .post("/users/login", {
        emailId: data.emailId,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((ex) => console.log(ex));
  };

  registerService = async (data) => {
    await axios
      .post("/users/register", {
        emailId: data.emailId,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((ex) => console.log(ex));
  };
}

export default UserServices;
