const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    packageName: { type: String, required: true },
    destination: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    imageUrl: { type: String, required: true },
    websiteLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Package", packageSchema);
