import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SignUp() {
  const [passwordText, setPasswordText] = useState("password");
  const showPassword = () => {
    if (passwordText === "password") {
      setPasswordText("text");
    } else if (passwordText === "text") {
      setPasswordText("password");
    }
  };



  const [error, setError] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const navigate = useNavigate();
  // const postUser = async (formEmail, formPassword, formFirst_name, formLast_name, formPhone_number, formAddress, formCity, formState, formPostal_code) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/person`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email: formEmail,
  //         password: formPassword,
  //         first_name: formFirst_name,
  //         last_name: formLast_name,
  //         phone_number: formPhone_number,
  //         address: formAddress,
  //         city: formCity,
  //         state: formState,
  //         postal_code: formPostal_code,
  //       }),
  //     });
  //     // console.log(`This is the response: ${response}`);

  //     const data = await response.json();
  //     if (data.detail){
  //       setError(data.detail) 
  //       alert(error)
  //     } else {
  //       setCookie("Email", data.email)
  //       setCookie("AuthToken", data.token)
  //       // <Navigate to="/" replace={true} />
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



  const HandleSubmit = async (e) => {
    e.preventDefault();

    // let email = e.target[2].value;
    // let password = e.target[3].value;
    // let first_name = e.target[0].value;
    // let last_name = e.target[1].value;
    // let phone_number = e.target[9].value;
    // let address = e.target[5].value;
    // let city = e.target[6].value;
    // let state = e.target[7].value;
    // let postal_code = e.target[8].value;

    // console.log(e.target[0].value); // First Name
    // console.log(e.target[1].value); // Last Name
    // console.log(e.target[2].value); // Email
    // console.log(e.target[3].value); // Password
    // console.log(e.target[4].value); // Show password box. When checked, returns 'on'. Omit from form
    // console.log(e.target[5].value); // Address
    // console.log(e.target[6].value); // City
    // console.log(e.target[7].value); // State
    // console.log(e.target[8].value); // Zip Code
    // console.log(e.target[9].value); // Phone Number

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/person`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target[2].value,
          password: e.target[3].value,
          first_name: e.target[0].value,
          last_name: e.target[1].value,
          phone_number: e.target[9].value,
          address: e.target[5].value,
          city: e.target[6].value,
          state: e.target[7].value,
          postal_code: e.target[8].value,
        }),
      });
      // console.log(`This is the response: ${response}`);

      const data = await response.json();
      if (data.detail){
        setError(data.detail)
      } else {
        setCookie("Email", data.email)
        setCookie("AuthToken", data.token)
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }


  };

  return (
    <div id="signUp" className="center py-3">
      <h1 className="mb-3">Sign up</h1>
      <Form onSubmit={HandleSubmit}>

        {/* First + Last Name */}
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label style={{ fontWeight: "bold" }}>
                First Name *
              </Form.Label>
              <Form.Control maxLength={50} required type="text" placeholder="First Name" />
            </Col>
            <Col>
              <Form.Label style={{ fontWeight: "bold" }}>
                Last Name *
              </Form.Label>
              <Form.Control maxLength={50} required type="text" placeholder="Last Name" />
            </Col>
          </Row>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>
            Email Address *
          </Form.Label>
          <Form.Control maxLength={62} required type="email" placeholder="Email" />
          {error &&
            <Form.Text className="text-muted ms-0">
              <Alert className="mt-2" key={"danger"} variant={"danger"} style={{padding: "0"}}>*This email already exists.</Alert>
            </Form.Text>
          }
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Password *</Form.Label>
          <Form.Control maxLength={255} required type={passwordText} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Show Password"
            onClick={() => showPassword()}
          />
        </Form.Group>

        {/* Address */}
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
          <Form.Control maxLength={95} type="text" placeholder="Address" />
        </Form.Group>

        {/* City */}
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>City</Form.Label>
          <Form.Control maxLength={35} type="text" placeholder="City" />
        </Form.Group>

        {/* State + Zip Code */}
        <Form.Group className="mb-3">
          <Row>
            <Col>
              {/* <Form.Label style={{ fontWeight: "bold" }}>State</Form.Label>
              <Form.Control type="text" placeholder="State" /> */}
              <Form.Label style={{ fontWeight: "bold" }}>State</Form.Label>
              <Form.Select aria-label="State">
                <option defaultValue="Select">Select State</option>
                <option value="AL">Alabama (AL)</option>
                <option value="AK">Alaska (AK)</option>
                <option value="AZ">Arizona (AZ)</option>
                <option value="AR">Arkansas (AR)</option>
                <option value="CA">California (CA)</option>
                <option value="CO">Colorado (CO)</option>
                <option value="CT">Connecticut (CT)</option>
                <option value="DE">Delaware (DE)</option>
                <option value="DC">District of Columbia (DC)</option>
                <option value="FL">Florida (FL)</option>
                <option value="GA">Georgia (GA)</option>
                <option value="HI">Hawaii (HI)</option>
                <option value="ID">Idaho (ID)</option>
                <option value="IL">Illinois (IL)</option>
                <option value="IN">Indiana (IN)</option>
                <option value="IA">Iowa (IA)</option>
                <option value="KS">Kansas (KS)</option>
                <option value="KY">Kentucky (KY)</option>
                <option value="LA">Louisiana (LA)</option>
                <option value="ME">Maine (ME)</option>
                <option value="MD">Maryland (MD)</option>
                <option value="MA">Massachusetts (MA)</option>
                <option value="MI">Michigan (MI)</option>
                <option value="MN">Minnesota (MN)</option>
                <option value="MS">Mississippi (MS)</option>
                <option value="MO">Missouri (MO)</option>
                <option value="MT">Montana (MT)</option>
                <option value="NE">Nebraska (NE)</option>
                <option value="NV">Nevada (NV)</option>
                <option value="NH">New Hampshire (NH)</option>
                <option value="NJ">New Jersey (NJ)</option>
                <option value="NM">New Mexico (NM)</option>
                <option value="NY">New York (NY)</option>
                <option value="NC">North Carolina (NC)</option>
                <option value="ND">North Dakota (ND)</option>
                <option value="OH">Ohio (OH)</option>
                <option value="OK">Oklahoma (OK)</option>
                <option value="OR">Oregon (OR)</option>
                <option value="PA">Pennsylvania (PA)</option>
                <option value="RI">Rhode Island (RI)</option>
                <option value="SC">South Carolina (SC)</option>
                <option value="SD">South Dakota (SD)</option>
                <option value="TN">Tennessee (TN)</option>
                <option value="TX">Texas (TX)</option>
                <option value="UT">Utah (UT)</option>
                <option value="VT">Vermont (VT)</option>
                <option value="VA">Virginia (VA)</option>
                <option value="WA">Washington (WA)</option>
                <option value="WV">West Virginia (WV)</option>
                <option value="WI">Wisconsin (WI)</option>
                <option value="WY">Wyoming (WY)</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label style={{ fontWeight: "bold" }}>Zip Code</Form.Label>
              <Form.Control maxLength={10} type="number" placeholder="Zip Code" />
            </Col>
          </Row>
        </Form.Group>

        {/* Phone Number */}
        <Form.Group className="mb-4">
          <Form.Label style={{ fontWeight: "bold" }}>Phone Number</Form.Label>
          <Form.Control maxLength={10} type="number" placeholder="Phone Number" />
        </Form.Group>

        {/* Join/Sign In buttons */}
        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Join
        </Button>
        <Form.Text className="text-muted">
          Already a member? <a href="/signin">Sign in</a>
        </Form.Text>
      </Form>
    </div>
  );
}

export default SignUp;
