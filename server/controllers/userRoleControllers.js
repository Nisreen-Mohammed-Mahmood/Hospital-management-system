const UserRole = require("../models/UserRole");
const Role = require("../models/Role");

// Assign a role to a user
exports.assignRoleToUser = async (req, res) => {
  const { userId, roleId } = req.params;

  try {
    // Check if the role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Create a new entry in UserRole
    const newUserRole = new UserRole({ user_id: userId, role_id: roleId });
    await newUserRole.save();

    res.status(201).json({ message: "Role assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a role from a user
exports.removeRoleFromUser = async (req, res) => {
  const { userId, roleId } = req.params;

  try {
    const userRole = await UserRole.findOneAndDelete({
      user_id: userId,
      role_id: roleId,
    });
    if (!userRole) {
      return res.status(404).json({ message: "Role assignment not found" });
    }
    res.status(200).json({ message: "Role removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all roles assigned to a user
exports.getUserRoles = async (req, res) => {
  const { userId } = req.params;

  try {
    const userRoles = await UserRole.find({ user_id: userId }).populate(
      "role_id",
      "role_name is_active"
    );
    res.status(200).json(userRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
