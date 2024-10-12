const GenericRepository = require("../database/repository/GenericRepository");
const UserModel = require("../database/model/user");

module.exports = class AuthenticationService {
  static async init() {
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
};
