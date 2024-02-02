const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true 
  },
  email: { 
    type: String,
    unique: true,
    required: true
  },
  BoardingName: {
    type: String,
    default: "Enter your Boarding name",
  },
  BoardingStatus: {
    type: Boolean,
    default: false,
  },
  BoardingOverview: {
    type: String,
    default: "Enter your Boarding Overview",
  },
  ShortDescription: {
    type: String,
    default: "Enter your Short Description (300 Characters)",
  },
  BoardingType: {
    type: Boolean,
    default: false,
  },
  AC: {
    type: Boolean,
    default: false,
  },
  BoardingAddress: {
    type: String,
    default: "Enter your Address (300 Characters)",
  },
  Telephone: {
    type: String,
    default: "Enter your Contact Number",
  },
  lat: {
    type: Number,
    default: 6.823359,
  },
  lng: {
    type: Number,
    default: 80.035558,
  },
  Price: {
    type: Number,
    default: 1000,
  },
}, {
  timestamps: true // Add timestamps to the schema
});

const User = mongoose.model("Owner", userSchema);

module.exports = User;
