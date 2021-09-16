const mongoose = require("mongoose");

// defines users database
const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
