const express = require("express");
const router = express.Router();
const Package = require("../../models/Packages");

// CREATE a new package
router.post("/packages", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all packages
router.get("/findpackages", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a package
router.put("/packages/:id", async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(updatedPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a package
router.delete("/packages/:id", async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE booking (including status updates like cancel or approve)

  

module.exports = router;
