const mongoose = require("mongoose");

const SpecificationSchema = new mongoose.Schema({
  general_title: {
    type: String,
    required: true,
    maxlength: 250,
  },
  specific_title: {
    type: String,
    required: true,
    maxlength: 250,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const Specification = mongoose.model("Specification", SpecificationSchema);
module.exports = Specification;
