const Staff = require("../models/Staff");
const User = require("../models/User"); // Assuming you have a User model

// Create a new staff member
exports.createStaff = async (req, res) => {
  const { user_id, name, title, office_num, building_num, is_active } =
    req.body;

  try {
    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new staff member
    const staff = new Staff({
      user_id,
      name,
      title,
      office_num,
      building_num,
      is_active,
    });

    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate("user_id", "username email");
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific staff member by ID
exports.getStaffById = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findById(id).populate(
      "user_id",
      "username email"
    );
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a staff member's details
exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, title, office_num, building_num, is_active } = req.body;

  try {
    const staff = await Staff.findByIdAndUpdate(
      id,
      { name, title, office_num, building_num, is_active },
      { new: true }
    );
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a staff member
exports.deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.status(200).json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
