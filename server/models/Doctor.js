const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  office_number: {
    type: String,
    maxlength: 10,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
