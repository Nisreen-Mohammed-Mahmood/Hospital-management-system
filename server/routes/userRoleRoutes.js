const express = require("express");
const {
  assignRoleToUser,
  removeRoleFromUser,
  getUserRoles,
} = require("../controllers/userRoleControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

// Assign role to a user
router.route("/:userId/:roleId").post(protect, authorizeRoles("admin"), assignRoleToUser); 

// Remove role from a user
router.route("/:userId/:roleId").delete(protect, authorizeRoles("admin"), removeRoleFromUser);

// Get all roles assigned to a user
router.route("/:userId").get(protect, getUserRoles); 

module.exports = router;
