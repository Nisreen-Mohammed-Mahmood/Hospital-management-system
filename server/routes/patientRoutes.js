const express = require("express");
const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientProfile,
  updatePatientProfile,
} = require("../controllers/patientControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, authorizeRoles("admin", "doctor"), getAllPatients)
  .post(protect, authorizeRoles("admin"), createPatient);

router.get(
  "/getPatientProfile/:id",
  protect,
  authorizeRoles("patient"),
  getPatientProfile
);
router.put(
  "/updatePatientProfile/:id",
  protect,
  authorizeRoles("patient"),
  updatePatientProfile
);
router
  .route("/:id")
  .get(protect, authorizeRoles("patient", "admin", "doctor"), getPatientById)
  .put(protect, authorizeRoles("admin","patient"), updatePatient)
  .delete(protect, authorizeRoles("admin"), deletePatient);

module.exports = router;
