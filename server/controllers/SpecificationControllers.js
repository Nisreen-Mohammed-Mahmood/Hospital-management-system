const DoctorSpecification = require("../models/DoctorSpecification");
const Specification = require("../models/Specification");
const Doctor = require("../models/Doctor");

// @desc    Create a doctor specification
// @route   POST /api/doctor-specifications
// @access  Admin
exports.createDoctorSpecification = async (req, res) => {
  const { specification_id, doctor_id } = req.body;

  try {
    // Check if the specification and doctor exist
    const specification = await Specification.findById(specification_id);
    const doctor = await Doctor.findById(doctor_id);

    if (!specification || !doctor) {
      return res
        .status(404)
        .json({ message: "Specification or Doctor not found" });
    }

    const newDoctorSpecification = new DoctorSpecification({
      specification_id,
      doctor_id,
    });

    await newDoctorSpecification.save();

    res.status(201).json({
      message: "Doctor specification created successfully",
      doctorSpecification: newDoctorSpecification,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all doctor specifications
// @route   GET /api/doctor-specifications
// @access  Admin, Doctor
exports.getDoctorSpecifications = async (req, res) => {
  try {
    const doctorSpecifications = await DoctorSpecification.find()
      .populate("specification_id", "general_title specific_title")
      .populate("doctor_id", "name");
    res.status(200).json(doctorSpecifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get doctor specification by ID
// @route   GET /api/doctor-specifications/:id
// @access  Admin, Doctor
exports.getDoctorSpecificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctorSpecification = await DoctorSpecification.findById(id)
      .populate("specification_id", "general_title specific_title")
      .populate("doctor_id", "name");
    if (!doctorSpecification) {
      return res
        .status(404)
        .json({ message: "Doctor specification not found" });
    }
    res.status(200).json(doctorSpecification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Delete doctor specification
// @route   DELETE /api/doctor-specifications/:id
// @access  Admin
exports.deleteDoctorSpecification = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctorSpecification =
      await DoctorSpecification.findByIdAndDelete(id);
    if (!deletedDoctorSpecification) {
      return res
        .status(404)
        .json({ message: "Doctor specification not found" });
    }
    res
      .status(200)
      .json({ message: "Doctor specification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
