const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/mailer"); // Import the mailer config
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    gender,
    identityCardNumber,
    address,
    role,
  } = req.body;

  try {
    // Validate request data
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password, // Password hashing handled in the pre-save hook
      phone_number: phoneNumber,
      date_of_birth: dateOfBirth,
      gender,
      identity_card_number: identityCardNumber,
      address,
    });

    // Save user to the database
    await newUser.save();

    // Create the role-specific profile
    if (role === "doctor") {
      const doctorProfile = new Doctor({
        user_id: newUser._id,
        office_number: "",
        is_active: false, // Default to false until the user confirms email
      });
      await doctorProfile.save();
    } else if (role === "patient") {
      const patientProfile = new Patient({
        user_id: newUser._id,
        marital_status: "",
        is_active: false, // Default to false until the user confirms email
      });
      await patientProfile.save();
    }

    // Generate confirmation token
    const token = generateToken(newUser._id, role);

    // Send confirmation email
    const confirmUrl = `http://localhost:4000/api/confirmation/confirm-account?token=${token}`;
    await sendEmail(
      email,
      "Confirm Your Account",
      "Please confirm your account by clicking the link below.",
      `<p>Please confirm your account by clicking the link below:</p><a href="${confirmUrl}">Confirm Account</a>`
    );

    res.status(201).json({
      message:
        "User registered successfully! Please check your email to confirm your account.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Confirm user account
// @route   GET /api/auth/confirm-account
// @access  Public
exports.confirmAccount = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;

    // Update the is_active status to true for Doctor or Patient based on role
    if (role === "doctor") {
      const doctor = await Doctor.findOne({ user_id: id });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      doctor.is_active = true;
      await doctor.save();
      return res.status(200).json({ message: "Doctor account confirmed!" });
    }

    if (role === "patient") {
      const patient = await Patient.findOne({ user_id: id });
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      patient.is_active = true;
      await patient.save();
      return res.status(200).json({ message: "Patient account confirmed!" });
    }

    return res.status(400).json({ message: "Invalid token or role" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Retrieve user role
    const role = await getUserRole(user._id);
    const isActive = await getUserStatus(user._id);

    // Generate JWT token
    const token = generateToken(user._id, role);
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
        isActive,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Helper function to retrieve the user's role
const getUserRole = async (userId) => {
  const isDoctor = await Doctor.findOne({ user_id: userId });
  if (isDoctor) return "doctor";

  const isPatient = await Patient.findOne({ user_id: userId });
  if (isPatient) return "patient";

  return "admin"; // Default fallback role
};
// Helper function to retrieve the user's status
const getUserStatus = async (userId) => {
  try {
    // Check if the user is a doctor
    const isDoctor = await Doctor.findOne({ user_id: userId });
    if (isDoctor) {
      console.log(`User found as doctor: ${isDoctor}`);
      return isDoctor.is_active;
    }

    // Check if the user is a patient
    const isPatient = await Patient.findOne({ user_id: userId });
    if (isPatient) {
      console.log(`User found as patient: ${isPatient}`);
      return isPatient.is_active;
    }

    // If user is neither a doctor nor a patient
    console.log(`No user found with userId: ${userId}`);
    return false;
  } catch (error) {
    // Handle errors during the database query
    console.error(`Error retrieving user status for userId ${userId}:`, error);
    throw new Error("An error occurred while retrieving user status.");
  }
};

