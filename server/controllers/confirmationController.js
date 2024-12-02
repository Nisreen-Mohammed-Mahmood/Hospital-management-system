const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const confirmAccount = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type === "patient") {
      const patient = await Patient.findOne({ user_id: decoded.userId });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      patient.is_active = true;
      await patient.save();
      return res.status(200).json({ message: "Patient account confirmed!" });
    }

    if (decoded.type === "doctor") {
      const doctor = await Doctor.findOne({ user_id: decoded.userId });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      doctor.is_active = true;
      await doctor.save();
      return res.status(200).json({ message: "Doctor account confirmed!" });
    }

    return res.status(400).json({ message: "Invalid token type" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { confirmAccount };
