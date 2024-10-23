import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignIn() {
  const [passwordText, setPasswordText] = useState("password");
  const showPassword = () => {
    if (passwordText === "password") {
      setPasswordText("text");
    } else if (passwordText === "text") {
      setPasswordText("password");
    }
  };

  return (
    <div id="signIn" className="center">
      <h1>Sign in</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
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
        <Form.Text className="text-muted">
          New to Build My Finance? <a href="/signup">Join now</a>
        </Form.Text>
      </Form>
    </div>
  );
}

export default SignIn;
