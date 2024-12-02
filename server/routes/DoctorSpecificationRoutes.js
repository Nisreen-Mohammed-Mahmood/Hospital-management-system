const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  getDoctorSpecializations,
  assignSpecializationToDoctor,
  removeSpecializationFromDoctor,
  getDoctorsBySpecialization,
  addDoctorSpecialization,
  editDoctorSpecialization,
  deleteDoctorSpecialization,
} = require("../controllers/DoctorSpecificationControllers");

const router = express.Router();

router
  .route("/:doctorId/specializations")
  .get(protect, authorizeRoles("patient","admin", "doctor"), getDoctorSpecializations) 
  .post(protect, authorizeRoles("admin"), assignSpecializationToDoctor); 

router
  .route("/:doctorId/specializations/:specializationId")
  .delete(protect, authorizeRoles("admin"), removeSpecializationFromDoctor); 

router
  .route("/specialization/:specializationId")
  .get(
    protect,
    authorizeRoles("admin", "doctor", "patient"),
    getDoctorsBySpecialization
  ); // All roles can view doctors by specialization

router
  .route("/:doctorId/specialization")
  .post(protect, authorizeRoles("admin"), addDoctorSpecialization) 
  .put(protect, authorizeRoles("admin"), editDoctorSpecialization); 

router
  .route("/:doctorId/specialization/:specializationId")
  .delete(protect, authorizeRoles("admin"), deleteDoctorSpecialization); 

module.exports = router;
