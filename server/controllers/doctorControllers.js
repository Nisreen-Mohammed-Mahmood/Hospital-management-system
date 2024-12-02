  const Doctor = require("../models/Doctor");
const User = require("../models/User");

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Admin, Patient
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "user",
      "name email phoneNumber"
    );
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Admin, Patient
exports.getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id).populate(
      "user",
      "name email phoneNumber"
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new doctor
// @route   POST /api/doctors
// @access  Admin
exports.createDoctor = async (req, res) => {
  const { userId, specializations, availableSlots } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const doctor = new Doctor({
      user: userId,
      specializations,
      availableSlots,
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update an existing doctor
// @route   PUT /api/doctors/:id
// @access  Admin
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { specializations, availableSlots } = req.body;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (specializations) doctor.specializations = specializations;
    if (availableSlots) doctor.availableSlots = availableSlots;

    const updatedDoctor = await doctor.save();

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Admin
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.remove();
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
