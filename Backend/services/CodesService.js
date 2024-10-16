const GenericRepository = require("../database/repository/GenericRepository");
const Util = require("../util/utils");
const CodesModel = require("../database/model/codes");
module.exports = class CodesService {
  static async init() {
    this.util = Util.init();
    this.repository = await GenericRepository.init();
    return this;
  }

  static async pushCodeToDB(code) {
    try {
      const modelData = {
        Code: code,
        Expiry: this.util.expirationTime(),
      };
      return await this.repository.create(CodesModel, modelData);
    } catch (ex) {
      throw ex;
    }
  }
};
