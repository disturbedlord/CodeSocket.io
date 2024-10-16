const mongoose = require("mongoose");

let codesSchema = mongoose.Schema({
  Code: {
    type: "String",
  },
  Expiry: {
    type: "String",
  },
});

module.exports = mongoose.model("Codes", codesSchema, "Codes");
