import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function NavbarTop() {

  const [active, setActive] = useState('/');
  const setActiveNav = () => {
      setActive((eventKey) => {
          return !eventKey;
      });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Build My Finance.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
                    
          <Nav className="ms-auto"
          variant="underline"
          activeKey={active}
          onSelect={setActiveNav}>

            {/* <Nav className="ms-auto" > */}

            {/* <Nav.Link href="/" className="px-4">Home</Nav.Link>
            <Nav.Link href="/financemanagement" className="px-4">Finance Management</Nav.Link>
            <Nav.Link href="/contact" className="px-4">Contact Us</Nav.Link>
            <Nav.Link href="/about" className="px-4">About</Nav.Link> */}

            <Nav.Item>
              <Nav.Link as={NavLink} end to="/" eventKey="/" className="px-4">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/financemanagement" eventKey="financemanagement" href='/financemanagement' className="px-4">Finance Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/contact" eventKey="/contact" className="px-4">Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/about" eventKey="/about" className="px-4">About</Nav.Link>
            </Nav.Item>

            {/* If not signed in, say 'Sign In'. Else (if signed in), say "Account" dropdown */}
            {/* <Nav.Link href="/signin" className='px-4 sign-in'>Sign In</Nav.Link> */}
            
            <Nav.Item>
              <NavDropdown eventKey="account" title="Account" id="basic-nav-dropdown" className='px-md-4 px-lg-0' style={{textAlign: 'center'}}>
                <NavDropdown.Item as={NavLink} to="/account" eventKey="account" style={{backgroundColor: 'white', color: '#575757'}}>Profile</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/account" eventKey="account" style={{backgroundColor: 'white', color: '#575757'}}>Setup</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/account" eventKey="account" style={{backgroundColor: 'white', color: '#575757'}}>Security</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/account" eventKey="signout" style={{backgroundColor: 'white', color: '#575757'}}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={NavLink} to="/signin" eventKey="/signin" className='px-4 signInNav' style={{color: 'white'}}>Sign In</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
