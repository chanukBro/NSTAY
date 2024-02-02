import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom";
import logo from './logo.png'


function AppBar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href=""><img src={logo} alt="" style={{height:"40px"}} /></Navbar.Brand>
          <Nav className="float-right">
            <Nav.Link as={Link} to="/student">All Boardings</Nav.Link>
            <Nav.Link as={Link} to="nstayMap">NSTAY Map</Nav.Link>
            <Nav.Link as={Link} to="news">News</Nav.Link>
            <Nav.Link as={Link} to="contactUS">Contact Us</Nav.Link>
            <Nav.Link as={Link} to="profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/">Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />

    </>
  );
}

export default AppBar;
