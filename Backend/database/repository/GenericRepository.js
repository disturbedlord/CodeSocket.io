import db from "../DatabaseConnection";
import mongoose from "mongoose";

module.exports = class GenericRepository {
  static async init() {
    await db.getConnection();
    return this;
  }
};
