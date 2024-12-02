const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    maxlength: 250,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
