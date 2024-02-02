const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/userModel");
const session = require('express-session');
const bodyParser = require('body-parser');
const Student = require("./models/studentModel");

app.use(express.json());
app.use(cors());


app.use(
  session({
    secret: '1225a55', // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in a production environment (HTTPS)
  })
);

// Owner Register
app.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Check if the owner email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user without hashing the password
    const newUser = new User({ name, password, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all Owners
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field from the response

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Get all the students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, { _id: 0, __v: 0 }); // Exclude unnecessary fields from the response

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get user data by email for owners
app.get("/:email", async (req, res) => {
  try {
    const email = req.params.email; // Retrieve the email from the route parameters

    // Find the user by email and exclude the password field
    const user = await User.findOne({ email }, { password: 0 });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update user details by email for owners
app.patch("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updateFields = req.body; // Fields to update

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    Object.keys(updateFields).forEach((key) => {
      if (user[key] !== undefined) {
        user[key] = updateFields[key];
      }
    });

    // Save the updated user
    await user.save();

    // Return updated user data
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Login API endpoint for owners
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    // Check if the provided password is correct without bcrypt
    if (password !== user.password) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    // Authentication successful
    res
      .status(200)
      .json({ message: "Login successful", user: { email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the user ID from the route parameters

    // Find the user by ID and exclude the password field
    const user = await User.findById(userId, { password: 0 });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




/////////////////////////////////////Student//////////////////////////////


//Register

app.post("/students/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Check if the student email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new student
    const newStudent = new Student({ name, password, email });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all Students


// Get student data by email
app.get("/students/:email", async (req, res) => {
  try {
    const email = req.params.email; // Retrieve the email from the route parameters

    // Find the student by email
    const student = await Student.findOne({ email }, { _id: 0, __v: 0 });

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Return student data
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update student details by email
app.patch("/students/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updateFields = req.body; // Fields to update

    // Find the student by email
    const student = await Student.findOne({ email });

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update student fields
    Object.keys(updateFields).forEach((key) => {
      if (student[key] !== undefined) {
        student[key] = updateFields[key];
      }
    });

    // Save the updated student
    await student.save();

    // Return updated student data
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Student Login API endpoint
app.post("/students/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Assuming you have a password field for students

    // Find the student by email
    const student = await Student.findOne({ email });

    // Check if the student exists
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the provided password is correct (replace with actual password comparison logic)
    // For example, you can use a password hashing library like bcrypt
    // For simplicity, this example compares plain text passwords
    if (password !== student.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Authentication successful
    res.status(200).json({ message: "Login successful", student: { email: student.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  mongoose
  .connect("mongodb+srv://kaushalyahansana:MLi0Hw9myOTzkr1u@mycluster.1hd4qsm.mongodb.net/test")
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the HTTP server
    app.listen(3000, () => {
      console.log("Node app is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

