const mongoose = require("mongoose");

const DoctorSpecificationSchema = new mongoose.Schema({
  specification_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specification",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
});

const DoctorSpecification = mongoose.model(
  "DoctorSpecification",
  DoctorSpecificationSchema
);
module.exports = DoctorSpecification;
