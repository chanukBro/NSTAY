import React, { useState } from 'react';
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "@fontsource/poppins/600.css";

import students from "../assets/students.png";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        // Redirect to the desired page upon successful login
        navigate('/student');
      } else {
        // Login failed, handle the error (show error message, etc.)
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);
      setError("Internal Server Error");
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

              <div className="buttons">
                <NavLink to="/">
                  <button class="button-class">Student</button>
                </NavLink>
                <NavLink to="/ownerLogin">
                  <button class="button-class-owner">Boarding Owner</button>
                </NavLink>
              </div>

              <div className="form-class">
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Student Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your NSBM email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  {error && <p style={{ color: 'red' }} className="error-message">{error}</p>}

                  <button type="submit" className="button-class-login">
                    Login
                  </button>
                </Form>
              </div>
              <div className="signup-link">
                Don't have an account?{" "}
                <Link to="/studentSignup">Create here</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
