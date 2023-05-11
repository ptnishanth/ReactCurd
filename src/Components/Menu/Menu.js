import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Menu.css";

function Menu() {
  return (
    <div>
      <Navbar bg="warning" expand="lg">
        <Container>
          <Navbar.Brand href="#home">NP's Recipie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link href="addUser" className="btn btn-outline-dark addUser">
                <i className="fa-solid fa-user-plus"></i>Add User
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;
