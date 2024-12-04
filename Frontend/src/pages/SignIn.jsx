import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

import Alert from 'react-bootstrap/Alert';
import { FiAlertTriangle } from "react-icons/fi";

function SignIn() {
  // Ignore unused variables on next line:
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [passwordText, setPasswordText] = useState("password");
  const showPassword = () => {
    if (passwordText === "password") {
      setPasswordText("text");
    } else if (passwordText === "text") {
      setPasswordText("password");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let time = d.toLocaleTimeString();
    let loginDate = `${month}-${day}-${year} @ ${time}`

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target[0].value,
          password: e.target[1].value,
        }),
      });

      const data = await response.json();
      if (data.detail){
        setError(data.detail)
      } else {
        setCookie("Email", data.email)
        setCookie("AuthToken", data.token)
        navigate("/financemanagement")
        console.log(data);
        await fetch(
          `${process.env.REACT_APP_SERVERURL}/person/${data.email}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              last_login: loginDate
            }),
          })

      }
    } catch (err) {
      console.log(err);
    }
  }

  const GuestLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "guest@buildmyfinance.com",
          password: "BMFTestAcct",
        }),
      });

      const data = await response.json();
      if (data.detail){
        setError(data.detail)
      } else {
        setCookie("Email", data.email)
        setCookie("AuthToken", data.token)
        navigate("/financemanagement")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div id="signIn" className="center">
      <h1>Sign in</h1>
      <Form onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type={passwordText} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show Password"
            onClick={() => showPassword()}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Log In
        </Button>
        {error && 
        <Form.Text className="text-center">
          <Alert className="mt-2" key={"danger"} variant={"danger"} style={{padding: "0"}}> 
            <FiAlertTriangle className="mb-1 me-1"/> 
            Incorrect email or password. 
            <br/> 
            <span>Please try again.</span>
          </Alert>
        </Form.Text>
        }
        <Form.Text className="text-muted">
          New to Build My Finance? <a href="/signup">Join now</a>
        </Form.Text>
        <br />
        <Form.Text className="text-muted">
          Want a preview? <button className="guestLoginButton" onClick={() => GuestLogin()}>View as Guest</button>
        </Form.Text>
      </Form>
    </div>
  );
}

export default SignIn;
