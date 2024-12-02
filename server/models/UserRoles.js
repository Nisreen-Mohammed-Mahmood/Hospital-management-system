const mongoose = require("mongoose");

const UserRoleSchema = new mongoose.Schema({
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserRole = mongoose.model("UserRole", UserRoleSchema);
module.exports = UserRole;
