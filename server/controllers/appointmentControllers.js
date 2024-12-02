const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Admin, Doctor
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email phoneNumber") // Populate patient details
      .populate("doctor", "name email specialization"); // Populate doctor details

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Admin, Doctor
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id)
      .populate("patient", "name email phoneNumber")
      .populate("doctor", "name email specialization");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Admin, Doctor
exports.createAppointment = async (req, res) => {
  const { patient, doctor, date, time, reason, status } = req.body;

  try {
    // Validate if the patient exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Validate if the doctor exists
    const existingDoctor = await Doctor.findById(doctor);
    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Create the new appointment
    const newAppointment = new Appointment({
      patient,
      doctor,
      date,
      time,
      reason,
      status,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update an existing appointment
// @route   PUT /api/appointments/:id
// @access  Admin, Doctor
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { patient, doctor, date, time, reason, status } = req.body;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the fields if provided
    if (patient) appointment.patient = patient;
    if (doctor) appointment.doctor = doctor;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (reason) appointment.reason = reason;
    if (status) appointment.status = status;

    const updatedAppointment = await appointment.save();

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Admin
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.remove();

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
