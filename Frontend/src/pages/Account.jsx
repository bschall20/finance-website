import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import SignUp from "./SignUp";
import { useCookies } from "react-cookie";

function Account() {
  // Ignore unused variables on next line:
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [person, setPerson] = useState([]);

  // const getAccountData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_SERVERURL}/person/${cookies.Email}`
  //     );
  //     const personJSON = await response.json();
  //     setPerson(personJSON[0]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const getAccountData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/person/${cookies.Email}`
        );
        const personJSON = await response.json();
        setPerson(personJSON[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getAccountData();
  }, [cookies.Email]);



  return (
    <div id="account">
      <div id="sideNav">
        <SideNav />
      </div>
      {/* <div id="profile" className="center"> */}
      {/* <h1 className="mb-3">Account Information</h1> */}
      {/* {person?.map((dataObj, index) => {
          return <SignUp person={person} />;
        })} */}
      <SignUp
        person={person}
        email={person.email}
        first_name={person.first_name}
        last_name={person.last_name}
        phone_number={person.phone_number}
        address={person.address}
        city={person.city}
        state={person.state}
        postal_code={person.postal_code}
      />
      {/* </div> */}
    </div>
  );
}

export default Account;
