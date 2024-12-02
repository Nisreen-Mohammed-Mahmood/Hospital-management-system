const DoctorSpecification = require("../models/DoctorSpecification");
const Specialization = require("../models/Specifications");
const Doctor = require("../models/Doctor");

// @desc    Get doctor specializations
// @route   GET /api/doctors/:doctorId/specializations
// @access  Protected
exports.getDoctorSpecializations = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctorSpecializations = await DoctorSpecification.find({
      doctor_id: doctorId,
    }).populate("specification_id");

    if (!doctorSpecializations.length) {
      return res
        .status(404)
        .json({ message: "No specializations found for this doctor" });
    }

    const specializations = doctorSpecializations.map(
      (docSpec) => docSpec.specification_id
    );

    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign specialization(s) to a doctor
// @route   POST /api/doctors/:doctorId/specializations
// @access  Protected
exports.assignSpecializationToDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { specializationIds } = req.body;

    if (!Array.isArray(specializationIds) || !specializationIds.length) {
      return res
        .status(400)
        .json({ message: "Please provide valid specialization IDs" });
    }

    // Validate all specializations
    const specializations = await Specialization.find({
      _id: { $in: specializationIds },
    });

    if (specializations.length !== specializationIds.length) {
      return res
        .status(404)
        .json({ message: "One or more specializations not found" });
    }

    // Add specializations to doctor
    const doctorSpecializations = specializationIds.map((specId) => ({
      doctor_id: doctorId,
      specification_id: specId,
    }));

    await DoctorSpecification.insertMany(doctorSpecializations);

    res
      .status(201)
      .json({ message: "Specializations assigned to doctor successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a specialization from a doctor
// @route   DELETE /api/doctors/:doctorId/specializations/:specializationId
// @access  Protected
exports.removeSpecializationFromDoctor = async (req, res) => {
  try {
    const { doctorId, specializationId } = req.params;

    const doctorSpecialization = await DoctorSpecification.findOneAndDelete({
      doctor_id: doctorId,
      specification_id: specializationId,
    });

    if (!doctorSpecialization) {
      return res
        .status(404)
        .json({ message: "Doctor specialization not found" });
    }

    res
      .status(200)
      .json({ message: "Specialization removed from doctor successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get doctors by specialization
// @route   GET /api/doctors/specialization/:specializationId
// @access  Protected
exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specializationId } = req.params;

    const doctorSpecializations = await DoctorSpecification.find({
      specification_id: specializationId,
    }).populate("doctor_id");

    if (!doctorSpecializations.length) {
      return res
        .status(404)
        .json({ message: "No doctors found for this specialization" });
    }

    const doctors = doctorSpecializations.map((docSpec) => docSpec.doctor_id);

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a specialization to a doctor
// @route   POST /api/doctors/:doctorId/specialization
// @access  Protected
exports.addDoctorSpecialization = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { specializationId } = req.body;

    const specialization = await Specialization.findById(specializationId);
    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    const doctorSpecialization = new DoctorSpecification({
      doctor_id: doctorId,
      specification_id: specializationId,
    });

    await doctorSpecialization.save();

    res
      .status(201)
      .json({ message: "Specialization added to doctor successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Edit a doctor's specialization
// @route   PUT /api/doctors/:doctorId/specialization
// @access  Protected
exports.editDoctorSpecialization = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { specializationId, newSpecializationId } = req.body;

    const newSpecialization = await Specialization.findById(
      newSpecializationId
    );
    if (!newSpecialization) {
      return res.status(404).json({ message: "New specialization not found" });
    }

    const doctorSpecialization = await DoctorSpecification.findOneAndUpdate(
      { doctor_id: doctorId, specification_id: specializationId },
      { specification_id: newSpecializationId },
      { new: true }
    );

    if (!doctorSpecialization) {
      return res
        .status(404)
        .json({ message: "Doctor specialization not found" });
    }

    res.status(200).json({
      message: "Specialization updated successfully",
      doctorSpecialization,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a specialization from a doctor
// @route   DELETE /api/doctors/:doctorId/specialization/:specializationId
// @access  Protected
exports.deleteDoctorSpecialization = async (req, res) => {
  try {
    const { doctorId, specializationId } = req.params;

    const doctorSpecialization = await DoctorSpecification.findOneAndDelete({
      doctor_id: doctorId,
      specification_id: specializationId,
    });

    if (!doctorSpecialization) {
      return res
        .status(404)
        .json({ message: "Doctor specialization not found" });
    }

    res
      .status(200)
      .json({ message: "Specialization removed from doctor successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
