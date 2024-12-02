const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  amount_paid: {
    type: Number,
    default: 0,
  },
   status: {
    type: String,
    enum: ["Pending", "Partially Paid", "Paid"],
    default: "Pending", 
    required: true,
  },
  last_payment_date: {
    type: Date,
  },
});

const Billing = mongoose.model("Billing", BillingSchema);
module.exports = Billing;
