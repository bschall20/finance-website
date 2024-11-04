import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";

import { BiSolidNotepad } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
// import { IoIosSettings } from "react-icons/io";
// import { IoMdLock } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";


function SideNav() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const navigate = useNavigate();
  const location = useLocation(); // used to find path name to set active side nav
  const [active, setActive] = useState(location.pathname);
  const handleSelect = (eventKey) => {
    setActive(eventKey);
  };

  const signOut = () => {
    removeCookie("Email")
    removeCookie("AuthToken")
    navigate("/signout")
  }

  return (
    <div id="sideNav">
      <Nav
        activeKey={active}
        onSelect={handleSelect}
        className="sideNavContent"
      >

        <p className="sideNavHeader ms-3 mb-0 mt-4">Management</p>

        <Nav.Item className="sideNavContainer">
          <Nav.Link
            className={"sideNavLink ps-3 " + (active === "/financemanagement" ? "selectedSideNav" : null)}
            as={NavLink}
            to="/financemanagement"
            eventkey="financemanagement"
            href="/financemanagement"
          >
            <BiSolidNotepad className="me-3 mb-1" style={{fontSize: "1.2rem"}}/>
            Finance
          </Nav.Link>
        </Nav.Item>

        
        <hr className="sideNavHR ms-3 mb-4" />
        <p className="sideNavHeader ms-3 my-0">Account</p>
        
        <Nav.Item className="sideNavContainer">
          <Nav.Link
            className={"sideNavLink ps-3 " + (active === "/account" ? "test" : null)}
            as={NavLink}
            to="/account"
            eventkey="profile"
            href="/account"
            style={{ color: active === "/account" ? "red" : "black" }}
          >
            <IoPersonSharp className="me-3 mb-1" style={{fontSize: "1.2rem"}}/>
            Profile
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item className="sideNavContainer">
          <Nav.Link
            className={"sideNavLink ps-3 " + (active === "/account" ? "test" : null)}
            as={NavLink}
            to="/account"
            eventkey="setup"
            href="/account"
            style={{ color: active === "/account" ? "red" : "black" }}
          >
            <IoIosSettings className="me-3 mb-1" style={{fontSize: "1.2rem"}}/>
            Setup
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="sideNavContainer">
          <Nav.Link
            className={"sideNavLink ps-3 " + (active === "/account" ? "test" : null)}
            as={NavLink}
            to="/account"
            eventkey="security"
            href="/account"
            style={{ color: active === "/account" ? "red" : "black" }}
          >
            <IoMdLock className="me-3 mb-1" style={{fontSize: "1.2rem"}}/>
            Security
          </Nav.Link>
        </Nav.Item> */}


        {/* <hr className="sideNavHR ms-3 mb-4" /> */}
        <Nav.Item className="sideNavContainer">
          <Nav.Link
            className={"sideNavLink ps-3 " + (active === "/signout" ? "test" : null)}
            as={NavLink}
            to="/signout"
            eventkey="signout"
            href="/signout"
            style={{ color: active === "/signout" ? "red" : "black" }}
            onClick={signOut}
          >
            <FaSignOutAlt className="me-3 mb-1" style={{fontSize: "1.2rem"}}/>
            Sign Out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SideNav;
