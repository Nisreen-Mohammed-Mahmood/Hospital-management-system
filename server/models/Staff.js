const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User collection
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 250,
  },
  title: {
    type: String,
    required: true,
    maxlength: 250,
  },
  office_num: {
    type: String,
    required: true,
  },
  building_num: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Staff = mongoose.model("Staff", StaffSchema);
module.exports = Staff;
