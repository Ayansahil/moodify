const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Username is required"],
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    unique: [true, "Password must be unique"],
  },
});

const userModal = mongoose.model("users", userSchema);

module.exports = userModal;
