const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: false,
    unique: true,
  },

  customer: {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    nationality: String,
    country: String,
    whatsapp: String,
    facebook: String,
    passportNumber: String,
    specialRequests: String,
    termsAccepted: {
      type: Boolean,
      default: false,
    },
    adults: {
      type: Number,
      required: true,
      min: 1,
    },
    children: {
      type: Number,
      default: 0,
    },
    infants: {
      type: Number,
      default: 0,
    },
  },

  package: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dateRange: String,
    days: Number,
    priceIDR: Number,
    priceUSD: Number,
    guideIncluded: Boolean,
    transportIncluded: Boolean,
    language: String,
    notes: String,
    places: [
      {
        name: String,
        description: String,
      },
    ],
  },

  totalPrice: {
    idr: Number,
    usd: Number,
  },

  bookingDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    default: "pending",
  },

  paymentStatus: {
    type: String,
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate booking ID before saving
bookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId = `BOOK-${Date.now().toString(36).toUpperCase()}`;
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
