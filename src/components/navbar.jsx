import React from "react";
// import "../index.css";
//import { NavLink } from "react-router-dom";

// function Navbar() {
//   return (
//     <div className='navbar'>
//       <NavLink to='/' className='navbar-title'>build my finance.</NavLink>
//       <nav className="navbar-list">
//         <NavLink to="/" className="nav-link nav-home">Home</NavLink>
//         <NavLink to="/financemanagement" className="nav-link nav-fm">Finance Management</NavLink>
//         <NavLink to="/contact" className="nav-link nav-contact">Contact Us</NavLink>
//         <NavLink to="/account" className="nav-link nav-account">Account</NavLink>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">build my finance.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navl">
            <Nav.Link href="/" className='px-4'>Home</Nav.Link>
            <Nav.Link href="/financemanagement" className='px-4'>Finance Management</Nav.Link>
            <Nav.Link href="/contact" className='px-4'>Contact Us</Nav.Link>

            {/* If not signed in, say 'Sign In'. Else (if signed in), say "Account" dropdown */}
            {/* <Nav.Link href="/signin" className='px-4 sign-in'>Sign In</Nav.Link> */}
            
            <NavDropdown title="Account" id="basic-nav-dropdown" className='px-md-4 px-lg-0'>
              <NavDropdown.Item href="/account">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/account">Setup</NavDropdown.Item>
              <NavDropdown.Item href="/account">Security</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/signout">Sign Out</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/signin" className='px-4' >Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
