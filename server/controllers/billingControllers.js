const Billing = require("../models/Billing");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

// @desc    Create a new billing record
// @route   POST /api/billing
// @access  Protected (Admin or Doctor)
exports.createBilling = async (req, res) => {
  const { patient_id, appointment_id, amount, amount_paid, status } = req.body;

  try {
    // Validate that patient and appointment exist
    const patient = await Patient.findById(patient_id);
    const appointment = await Appointment.findById(appointment_id);

    if (!patient || !appointment) {
      return res
        .status(404)
        .json({ message: "Patient or Appointment not found" });
    }

    // Create the billing record
    const billing = new Billing({
      patient_id,
      appointment_id,
      amount,
      amount_paid: amount_paid || 0, // If no amount is paid, default to 0
      status,
    });

    // Save the billing record
    await billing.save();

    res.status(201).json({
      message: "Billing record created successfully",
      billing,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all billing records for a patient
// @route   GET /api/billing/:patient_id
// @access  Protected (Admin or Doctor)
exports.getBillingByPatient = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const billings = await Billing.find({ patient_id })
      .populate("appointment_id")
      .populate("patient_id");

    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    Update billing record (e.g., payment updates)
// @route   PUT /api/billing/:id
// @access  Protected (Admin or Doctor)
exports.updateBilling = async (req, res) => {
  const { id } = req.params;
  const { amount_paid, status, last_payment_date } = req.body;

  try {
    // Find the billing record
    const billing = await Billing.findById(id);

    if (!billing) {
      return res.status(404).json({ message: "Billing record not found" });
    }

    // Update payment details
    billing.amount_paid = amount_paid || billing.amount_paid;
    billing.status = status || billing.status;
    billing.last_payment_date = last_payment_date || billing.last_payment_date;

    // Recalculate outstanding amount
    const outstandingAmount = billing.amount - billing.amount_paid;
    billing.status = outstandingAmount <= 0 ? "Paid" : "Partial";

    await billing.save();

    res.status(200).json({
      message: "Billing record updated successfully",
      billing,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Delete a billing record
// @route   DELETE /api/billing/:id
// @access  Protected (Admin)
exports.deleteBilling = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the billing record
    const billing = await Billing.findByIdAndDelete(id);

    if (!billing) {
      return res.status(404).json({ message: "Billing record not found" });
    }

    res.status(200).json({
      message: "Billing record deleted successfully",
      billing,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
