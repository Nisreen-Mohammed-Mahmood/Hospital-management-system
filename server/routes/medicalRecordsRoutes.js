const express = require("express");
const {
  getAllMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/:patientId")
  .get(protect,authorizeRoles("admin", "doctor"), getAllMedicalRecords) 
  .post(protect,authorizeRoles("admin", "doctor"), createMedicalRecord); 

router
  .route("/:patientId/:recordId")
  .get(protect,authorizeRoles("admin", "doctor"), getMedicalRecordById) 
  .put(protect,authorizeRoles("admin", "doctor"), updateMedicalRecord) 
  .delete(protect,authorizeRoles("admin", "doctor"), deleteMedicalRecord); 

module.exports = router;
