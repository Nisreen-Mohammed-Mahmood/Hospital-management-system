const Role = require("../models/Role");

// Create a new role
exports.createRole = async (req, res) => {
  const { role_name, is_active } = req.body;

  try {
    const newRole = new Role({ role_name, is_active });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific role by ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific role
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role_name, is_active } = req.body;

  try {
    const role = await Role.findByIdAndUpdate(
      id,
      { role_name, is_active },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific role
exports.deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
