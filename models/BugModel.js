const mongoose = require("mongoose");

const BugSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  appName: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: true,
    default: "Low",
  },
  isActiveBug: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Bug", BugSchema);
