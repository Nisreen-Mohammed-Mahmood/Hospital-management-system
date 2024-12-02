const mongoose = require("mongoose");

const MedicalDiagnosisSchema = new mongoose.Schema({
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  detail: {
    type: String,
    maxlength: 500,
  },
  medications: {
    type: String,
    maxlength: 500,
  },
  allergies: {
    type: String,
    maxlength: 500,
  },
  surgeries: {
    type: String,
    maxlength: 500,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const MedicalDiagnosis = mongoose.model(
  "MedicalDiagnosis",
  MedicalDiagnosisSchema
);
module.exports = MedicalDiagnosis;
