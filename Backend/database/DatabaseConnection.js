const mongoose = require("mongoose");

module.exports = class DatabaseConnection {
  static async getConnection() {
    try {
      if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }
    } catch (ex) {
      throw ex;
    }
  }
};
