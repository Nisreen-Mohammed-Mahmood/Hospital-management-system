const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  marital_status: {
    type: String,
    maxlength: 20,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
