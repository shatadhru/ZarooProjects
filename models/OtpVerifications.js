const mongoose = require("mongoose");

const OtpVerificationsSchema = new mongoose.Schema({
  useremail: {
    type: String,
  },
  otp: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});


const OtpVerifications = mongoose.model(
  "OtpVerifications",
  OtpVerificationsSchema
);

module.exports = OtpVerifications; 