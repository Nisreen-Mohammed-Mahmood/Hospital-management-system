const MedicalRecord = require("../models/MedicalDiagnosis");
const Patient = require("../models/Patient");

// @desc    Get all medical records for a specific patient
// @route   GET /api/medical-records/:patientId
// @access  Admin, Doctor
exports.getAllMedicalRecords = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Get all medical records for this patient
    const records = await MedicalRecord.find({ patient: patientId }).populate(
      "doctor",
      "name specialty"
    );

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a single medical record by ID
// @route   GET /api/medical-records/:patientId/:recordId
// @access  Admin, Doctor
exports.getMedicalRecordById = async (req, res) => {
  const { patientId, recordId } = req.params;

  try {
    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Get the medical record by ID
    const record = await MedicalRecord.findById(recordId).populate(
      "doctor",
      "name specialty"
    );

    if (!record) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new medical record for a patient
// @route   POST /api/medical-records/:patientId
// @access  Admin, Doctor
exports.createMedicalRecord = async (req, res) => {
  const { patientId } = req.params;
  const { doctorId, diagnosis, treatment, medications, notes } = req.body;

  try {
    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create a new medical record
    const medicalRecord = new MedicalRecord({
      patient: patientId,
      doctor: doctorId,
      diagnosis,
      treatment,
      medications,
      notes,
    });

    await medicalRecord.save();
    res.status(201).json({
      message: "Medical record created successfully",
      medicalRecord: medicalRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a medical record
// @route   PUT /api/medical-records/:patientId/:recordId
// @access  Admin, Doctor
exports.updateMedicalRecord = async (req, res) => {
  const { patientId, recordId } = req.params;
  const { diagnosis, treatment, medications, notes } = req.body;

  try {
    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Ensure the record exists
    const medicalRecord = await MedicalRecord.findById(recordId);
    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    // Update the record
    if (diagnosis) medicalRecord.diagnosis = diagnosis;
    if (treatment) medicalRecord.treatment = treatment;
    if (medications) medicalRecord.medications = medications;
    if (notes) medicalRecord.notes = notes;

    const updatedRecord = await medicalRecord.save();
    res.status(200).json({
      message: "Medical record updated successfully",
      medicalRecord: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a medical record
// @route   DELETE /api/medical-records/:patientId/:recordId
// @access  Admin, Doctor
exports.deleteMedicalRecord = async (req, res) => {
  const { patientId, recordId } = req.params;

  try {
    // Ensure the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Ensure the record exists
    const medicalRecord = await MedicalRecord.findById(recordId);
    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    await medicalRecord.remove();
    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
