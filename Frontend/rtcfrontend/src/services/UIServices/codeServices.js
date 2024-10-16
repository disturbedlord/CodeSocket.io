import axios from "axios";
class CodeServices {
  static shareCode = async () => {
    let response = await axios
      .post("/codes/newcode")
      .then((res) => {
        console.log("Aa:", res);
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
        return { code: "" };
      });
    return response;
  };
}

export default CodeServices;
