const express = require("express");
const router = express.Router();
const User = require("../../models/AuthenticationMOdel");

// GET http://localhost:3000/api/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // get all users from DB
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
