const express = require("express");
const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware"); 
const router = express.Router();

// Create a new staff member
router.route("/").post(protect, authorizeRoles("admin"), createStaff);

// Get all staff members
router.route("/").get(protect, authorizeRoles("admin"), getAllStaff);

// Get a specific staff member by ID
router.route("/:id").get(protect, authorizeRoles("admin"), getStaffById);

// Update a staff member's details
router.route("/:id").put(protect, authorizeRoles("admin"), updateStaff);

// Delete a staff member
router.route("/:id").delete(protect, authorizeRoles("admin"), deleteStaff);

module.exports = router;
