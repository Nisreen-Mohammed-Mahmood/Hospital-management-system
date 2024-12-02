const express = require("express");
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, authorizeRoles("patient","admin", "doctor"), getAllAppointments) 
  .post(protect, authorizeRoles("patient","admin", "doctor"), createAppointment); 

router
  .route("/:id")
  .get(protect, authorizeRoles("admin", "doctor"), getAppointmentById) 
  .put(protect, authorizeRoles("admin", "doctor"), updateAppointment) 
  .delete(protect, authorizeRoles("admin"), deleteAppointment);

module.exports = router;
