const randomColor = require("randomcolor");
module.exports = class Util {
  /**
   * Init class
   *
   * @author Guilherme da Silva Martin
   */
  static init() {
    return this;
  }

  /**
   * Checks if the object sent by parameter is null, undefined, or empty.
   *
   * @author Guilherme da Silva Martin
   */
  static isNullOrEmpty(obj) {
    if (obj === null || obj === undefined || obj.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  static expirationTime() {
    return new Date(Date.now() + 1 * 3600000);
  }

  static getRandomColor() {
    return randomColor();
  }
};
