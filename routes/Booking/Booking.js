const express = require("express");
const router = express.Router();
const Booking = require("../../models/BoookingModels");
const nodemailer = require("nodemailer");

// Nodemailer setup
const sendMessageToAdmin = async (subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssnmggs@gmail.com",
        pass: "kqhsktorbbciwpti", // ⚠️ Consider using environment variables for security
      },
    });

    const mailOptions = {
      from: "ssnmggs@gmail.com",
      to: "ssnmggs@gmail.com", // 🔁 Replace with your actual admin email
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
};

// Create new booking
router.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    booking.paymentStatus = "under_verification";
    booking.status = "under_review";
    await booking.save();

    // Send booking data to admin email
    const subject = `New Booking Received: ${booking.bookingId || "No ID"}`;
    const message = `
New Booking Received:
----------------------------
Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Package: ${booking.packageName}
Date: ${booking.date}
People: ${booking.peopleCount}
Status: ${booking.status}
Payment: ${booking.paymentStatus}
----------------------------
Full Data: ${JSON.stringify(booking.toObject(), null, 2)}
    `;

    await sendMessageToAdmin(subject, message);

    res.status(201).json({
      success: true,
      booking: booking.toObject(),
      message: "Booking confirmed and sent to admin email",
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

module.exports = router;
