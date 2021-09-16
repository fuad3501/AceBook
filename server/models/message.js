const mongoose = require("mongoose");

// defines message database
const MessageSchema = new mongoose.Schema({
  userId: String,
  name: String,
  content: String
});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);
