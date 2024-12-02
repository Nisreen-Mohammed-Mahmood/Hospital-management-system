const express = require("express");
const {
  createDoctorSpecification,
  getDoctorSpecifications,
  getDoctorSpecificationById,
  deleteDoctorSpecification,
} = require("../controllers/doctorSpecificationController");
const { protect, admin } = require("../middleware/authMiddleware"); 
const router = express.Router();

router
  .route("/")
  .get(protect,authorizeRoles("admin", "doctor"), getDoctorSpecifications) 
  .post(protect, admin,authorizeRoles("admin"), createDoctorSpecification); 

router
  .route("/:id")
  .get(protect,authorizeRoles("admin", "doctor"), getDoctorSpecificationById) 
  .delete(protect, admin,authorizeRoles("admin"), deleteDoctorSpecification); 

module.exports = router;
