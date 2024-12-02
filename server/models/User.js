const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 250,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 250,
  },
  phone_number: {
    type: String,
    required: true,
    maxlength: 16,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    maxlength: 10,
  },
  address: {
    type: String,
    maxlength: 500,
  },
  identity_card_number: {
    type: String,
    unique: true,
    default: null,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is not modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (err) {
    next(err); // Pass error to middleware
  }
});

// Method to compare passwords for login
UserSchema.methods.comparePassword = async function (inputPassword) {
  try {
    return await bcrypt.compare(inputPassword, this.password); // Compare hashed password
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
