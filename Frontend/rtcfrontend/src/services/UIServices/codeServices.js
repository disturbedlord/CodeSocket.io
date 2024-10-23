import axios from "axios";
class CodeServices {
  static shareCode = async () => {
    let response = await axios
      .post("http://localhost:3000/codes/newcode")
      .then((res) => {
        if (
          res !== undefined &&
          res.status === 200 &&
          res.data.data !== undefined
        ) {
          return { code: res.data.data["code"] };
        }
      })
      .catch((ex) => {
        console.log("ShareCode : ", ex);
        return null;
      });
    return response;
  };

  static validateRoomCode = async (data) => {
    try {
      console.log("ValidateRoom : ", data);
      const { code } = data;
      let roomValid = await axios
        .get(`http://localhost:3000/codes/validate/${code}`)
        .then((res) => {
          if (res.status === 200) return true;
          return false;
        });
      return roomValid;
    } catch (ex) {
      console.log("Validate Room Code Exception: ", ex);
      return false;
    }
  };
}

export default CodeServices;
