// volunteerModel.js
const mongoose = require('mongoose');

// Define the schema for the Volunteer collection
const volunteerSchema = new mongoose.Schema({
    name: String,
    email: String,
    profession: String,
    age: Number,
    phone: String,
    address: String,
    skills: String,
    availability: String,
    // Add more fields as needed
});

// Create a model from the schema
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
