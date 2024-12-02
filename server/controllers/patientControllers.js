const Patient = require("../models/Patient");
const User = require("../models/User");

// @desc    Get all patients
// @route   GET /api/patients
// @access  Admin, Doctor
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate(
      "user",
      "name email phoneNumber"
    );
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get patient by user_id
// @route   GET /api/patients/user/:id
// @access  Patient
exports.getPatientProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the patient where 'user_id' matches the provided 'id'
    const patient = await Patient.findOne({ user_id: id }).populate(
      "user_id",
      "name email phone_number date_of_birth gender address identity_card_number"
    );

    console.log(patient, "patient");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const result = {
      ...patient.toObject(),
      user: patient.user_id,
    };
    delete result.user_id;

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching patient by user_id:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update patient profile by user_id
// @route   PUT /api/patients/user/:id
// @access  Patient
exports.updatePatientProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Validate if the patient exists
    const patient = await Patient.findOne({ user_id: id });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Update the related User document
    const userupdatedData = {
      name: updatedData.name,
      email: updatedData.email,
      phone_number: updatedData.phone_number,
      date_of_birth: updatedData.date_of_birth,
      gender: updatedData.gender,
      address: updatedData.address,
      identity_card_number: updatedData.identity_card_number,
    };
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { $set: userupdatedData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated profile
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      patient: patient,
    });
  } catch (error) {
    console.error("Error updating patient profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Admin, Doctor
exports.getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id).populate(
      "user",
      "name email phoneNumber"
    );
    console.log(patient, "patient");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new patient
// @route   POST /api/patients
// @access  Admin
exports.createPatient = async (req, res) => {
  const { userId, medicalHistory, admitted } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = new Patient({
      user: userId,
      medicalHistory,
      admitted,
    });

    await patient.save();
    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update an existing patient
// @route   PUT /api/patients/:id
// @access  Admin
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { medicalHistory, admitted } = req.body;

  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (medicalHistory) patient.medicalHistory = medicalHistory;
    if (admitted !== undefined) patient.admitted = admitted;

    const updatedPatient = await patient.save();

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Admin
exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.remove();
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
