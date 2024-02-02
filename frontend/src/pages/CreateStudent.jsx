import { useState } from 'react';
import "./CreateStudent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "@fontsource/poppins/600.css";

import students from "../assets/students.png";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !password || !reenteredPassword || password !== reenteredPassword) {
      // Handle form validation error, show a message to the user
      if (password !== reenteredPassword) {
        setError("Passwords do not match. Please make sure to enter the same password in both fields.");
      } else {
        setError("Please fill out all fields correctly");
      }
      return;
    }

    // Assuming you have an API endpoint for student registration
    try {
      const response = await fetch('http://localhost:3000/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Registration successful, you might redirect the user or show a success message
        console.log("Student registered successfully");

        toast.success('Account created successfully, redirecting to login...', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2500,
        });

        setTimeout(() => {
          navigate('/');
        }, 3000);

      } else {
        const errorData = await response.json();
        console.error("Registration failed", errorData);

        if (response.status === 400 && errorData.message === "Email already exists") {
          // Email is already in use, set an error message
          setError("Email is already in use. Please use a different email.");
        }
      }
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={7}>
            <div className="image-area">
              <img
                src={students}
                alt="students-image"
                className="students-image"
              />
            </div>
          </Col>

          <Col sm={5}>
            <div className="login-area">
              <div className="header-logo">
                <img src={logo} alt="logo" className='logo' />
              </div>
              <div>
                <p className="create-header">Create Your Free Account</p>
              </div>

              <div className="buttons-create">
                <NavLink to="/studentSignup">
                  <button class="button-class-createStudent-student">
                    Student
                  </button>
                </NavLink>
                <NavLink to="/ownerSignup">
                  <button class="button-class-createStudent-owner">
                    Boarding Owner
                  </button>
                </NavLink>
              </div>

              <div className="form-class-create-student">
                <Form onSubmit={handleSignUp}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Student Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your NSBM email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Re Enter your Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re Enter your Password"
                      onChange={(e) => setReenteredPassword(e.target.value)}
                    />
                  </Form.Group>

                  {error && <p style={{ color: 'red' }} className="error-message">{error}</p>}

                  <button type="submit" class="button-class-login-create-student">
                    Sign Up
                  </button>
                </Form>
              </div>
              <div className="signup-link-create-student">
                Already have an account? <Link to="/">Login here</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}

export default CreateStudent;
