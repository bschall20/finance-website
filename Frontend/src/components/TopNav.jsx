import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { NavLink } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

function TopNav(props) {
  // Ignore unused variables on next line:
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [active, setActive] = useState('/');
  const setActiveNav = () => {
      setActive((eventkey) => {
          return !eventkey;
      });
  };

  const navigate = useNavigate();
  const signOut = () => {
    removeCookie("Email")
    removeCookie("AuthToken")
    navigate("/signout")
  }

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

            <Nav.Item>
              <Nav.Link as={NavLink} end to="/" eventkey="/" className="px-4">Home</Nav.Link>
            </Nav.Item>
            { props.signedIn &&
            <Nav.Item>
              <Nav.Link as={NavLink} to="/financemanagement" eventkey="financemanagement" href='/financemanagement' className="px-4">Finance Management</Nav.Link>
            </Nav.Item>
            }
            { !props.signedIn &&
            <Nav.Item>
              <Nav.Link as={NavLink} to="/signin" eventkey="signin" href='/signin' className="px-4">Finance Management</Nav.Link>
            </Nav.Item>
            }
            <Nav.Item>
              <Nav.Link as={NavLink} to="/contact" eventkey="/contact" className="px-4">Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/about" eventkey="/about" className="px-4">About</Nav.Link>
            </Nav.Item>

            {/* If not signed in, say 'Sign In'. Else (if signed in), say "Account" dropdown */}
            {/* <Nav.Link href="/signin" className='px-4 sign-in'>Sign In</Nav.Link> */}
            

            { props.signedIn &&
            <Nav.Item>
              <NavDropdown eventkey="account" title="Account" id="basic-nav-dropdown" className='px-md-4 px-lg-0' style={{textAlign: 'center'}}>
                <NavDropdown.Item as={NavLink} to="/account" eventkey="account" style={{backgroundColor: 'white', color: '#575757'}}>Profile</NavDropdown.Item>
                {/* <NavDropdown.Item as={NavLink} to="/account" eventkey="account" style={{backgroundColor: 'white', color: '#575757'}}>Setup</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/account" eventkey="account" style={{backgroundColor: 'white', color: '#575757'}}>Security</NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={signOut} style={{backgroundColor: 'white', color: '#575757'}}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
            }

            {!props.signedIn && 
            <Nav.Item>
              <Nav.Link as={NavLink} to="/signin" eventkey="/signin" className='px-4 signInNav' style={{backgroundColor: "#198754", color: 'white'}}>Sign In</Nav.Link>
            </Nav.Item>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
