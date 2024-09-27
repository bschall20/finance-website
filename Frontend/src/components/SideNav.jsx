import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";


function SideNav() {
    const [active, setActive] = useState('/');
    const setActiveNav = () => {
        setActive((eventkey) => {
            console.log(eventkey)
            return !eventkey;
        });
    };

  return <div id="sideNav" className="center">
        <Nav
        //   variant="underline"
          activeKey={active}
          onSelect={setActiveNav}
          className="sideNavContent center"
        //   style={{position: 'fixed', display: 'flex', flexDirection:'column', margin: 'auto', width: '100%', alignItems: 'center', justifyContent: 'center'}}
          
          >
            <Nav.Item>
              <Nav.Link as={NavLink} to="/account" eventkey="profile" href='/account'>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/account" eventkey="setup" href='/account'>Setup</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/account" eventkey="security" href='/account'>Security</Nav.Link>
            </Nav.Item>
            <hr style={{width: '100%'}}/>
            <Nav.Item>
            <Nav.Link as={NavLink} to="/financemanagement" eventkey="financemanagement" href='/financemanagement'>Finance Management</Nav.Link>
            </Nav.Item>
        </Nav>
  </div>
}

export default SideNav;