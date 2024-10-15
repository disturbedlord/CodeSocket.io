const GenericRepository = require("../database/repository/GenericRepository");
const UserModel = require("../database/model/user");
const Util = require("../util/utils");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../model/response/ErrorResponse");

module.exports = class AuthenticationService {
  static async init() {
    this.util = Util.init();
    this.repository = await GenericRepository.init();
    return this;
  }

  static async login(email, password) {
    try {
      let loginParams = {
        Email: email,
        Password: password,
      };

      return await this.repository.find(UserModel, loginParams);
    } catch (ex) {
      throw ex;
    }
  }

  static async authenticateUser(userData) {
    try {
      if (!this.util.isNullOrEmpty(userData)) {
        const token = await jwt.sign(
          {
            id: userData[0]._id,
            nickname: userData[0].Nickname,
            email: userData[0].Email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return token;
      } else {
        throw new ErrorResponse(400, "User not found", null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  static async register(email, password) {
    try {
      let createUser = {
        Nickname: "",
        Email: email,
        Password: password,
        Image: "",
      };

      return await this.repository.create(UserModel, createUser);
    } catch (ex) {
      throw ex;
    }
  }

  static async userExist(email) {
    try {
      let userParams = {
        Email: email,
      };
      const userExist = await this.repository.find(UserModel, userParams);
      if (userExist.length > 0) {
        return true;
      }
      return false;
    } catch (ex) {
      throw ex;
    }
  }
};
