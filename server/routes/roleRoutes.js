const express = require("express");
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/roleControllers");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new role (Admin access)
router.route("/").post(protect, authorizeRoles("admin"), createRole);

// Get all roles (Admin access)
router.route("/").get(protect, authorizeRoles("admin"), getAllRoles);

// Get a specific role by ID (Admin access)
router.route("/:id").get(protect, authorizeRoles("admin"), getRoleById);

// Update a specific role (Admin access)
router.route("/:id").put(protect, authorizeRoles("admin"), updateRole);

// Delete a specific role (Admin access)
router.route("/:id").delete(protect, authorizeRoles("admin"), deleteRole);

module.exports = router;
