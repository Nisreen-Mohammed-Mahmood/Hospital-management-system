const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  visit_datetime: {
    type: Date,
    required: true,
  },
  is_follow_up: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
    maxlength: 500,
  },
  status: {
    type: Number, // Assuming status codes (e.g., 1 = confirmed, 0 = canceled)
    required: true,
  },
  cancelling_reason: {
    type: String,
    maxlength: 500,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
