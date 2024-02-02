const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
