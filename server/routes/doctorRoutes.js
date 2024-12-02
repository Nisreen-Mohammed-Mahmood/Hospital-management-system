const express = require("express");
const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

// Doctor Routes
router
  .route("/")
  .get(protect,authorizeRoles("patient","admin", "doctor"), getAllDoctors)
  .post(protect,authorizeRoles("admin"), createDoctor);

router
  .route("/:id")
  .get(protect,authorizeRoles("admin", "doctor") ,getDoctorById) 
  .put(protect,authorizeRoles("admin", "doctor"), updateDoctor)
  .delete(protect,authorizeRoles("admin", "doctor"), deleteDoctor);

module.exports = router;
