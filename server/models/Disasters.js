// DisasterModel.js
const mongoose =require('mongoose');

// Define the schema for the Disaster collection
const disasterSchema = new mongoose.Schema({
  crisisType: String,
  location: String,
  severity: String,
  dateTime: Date,
  description: String,
  casualties: Number,
  affectedPopulation: Number,
  emergencyResponse: String,
  additionalNotes: String,
  uploaderName: String,
  uploaderEmail: String,
  uploadedPhotos: [String], // Assuming photo URLs will be stored as strings
});

// Create a model from the schema
const Disaster = mongoose.model('Disaster', disasterSchema);

module.exports=Disaster;
