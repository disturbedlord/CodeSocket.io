const mongoose = require("mongoose");

module.exports = class DatabaseConnection {
  static async getConnection() {
    try {
      if (!mongoose.connection.readyState) {
        console.log("Connecting to the database...");
        await mongoose.connect(process.env.MONGODB_URI, {
          // Options can be omitted if using Mongoose 6+
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("Database connected successfully.");
      } else {
        console.log("Already connected to the database.");
      }
    } catch (ex) {
      console.error("Database connection error:", ex);
      throw ex; // You can handle this more gracefully if needed
    }
  }
};
