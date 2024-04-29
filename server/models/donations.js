const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true,
    min: 100 // Set the minimum donation amount
  },
  message: {
    type: String
  },
  city: {
    type: String
  }
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
