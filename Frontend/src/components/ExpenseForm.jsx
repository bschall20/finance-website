// import React, { useState, useEffect } from "react";
// import React, { useEffect } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useCookies } from "react-cookie";

function ExpenseForm(props) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const postExpenseData = async (formTitle, formAmount, formType, formDate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          expense_type: formType,
          date: formDate,
          person_email: cookies.Email,
        }),
      });
      // const data = await response.json();
      // setCookie("Email", data.email)
      // setCookie("AuthToken", data.token)

      console.log(`This is the response: ${response}`);
    } catch (err) {
      console.log(err);
    }
  };

  const editExpenseData = async (formTitle, formAmount, formType, formDate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/expense`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          title: formTitle,
          amount: parseFloat(formAmount),
          expense_type: formType,
          date: formDate,
          person_email: cookies.Email,
        }),
      });
      console.log(`edit has been clicked for ${response.title}`);
      if (response.status === 200) {
        console.log("ID = ");
        console.log(props.id);
        console.log("Title = ");
        console.log(formTitle);
        console.log("Amount = ");
        console.log(formAmount);
        console.log("Expense Type = ");
        console.log(formType);
        console.log("Form date = ");
        console.log(formDate);
        console.log("reponse status is 200");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const HandleSubmit = async (e) => {
    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    let formType = e.target[2].value;
    let formDate = e.target[3].value;

    if (formType === "SelectTypeOfExpense") {
      console.log("No entry - used default Select Type of Expense.");
      alert("Entry not submitted. Please resubmit and choose a valid Expense Type.")
      return null;
    }
    if (props.postexpense === 1) {
      console.log("Post data called");
      return postExpenseData(formTitle, formAmount, formType, formDate);
    } else {
      return editExpenseData(formTitle, formAmount, formType, formDate);
    }
  }

  return (
    <Form onSubmit={HandleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type=""
              placeholder="Enter Expense Title"
              required
              name="title"
              defaultValue={props.title}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Amount Spent</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            {/* <Form.Control aria-label="Amount spent" /> */}
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              required
              name="amount"
              defaultValue={props.amount}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label>Expense Type</Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            name="expense_type"
            defaultValue={props.expensetype}
          >
            <option value="SelectTypeOfExpense" hidden>Select Type of Expense</option>
            <option value="Mortgage/Rent">Mortgage/Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Insurance">Insurance</option>
            <option value="Loans">Loans</option>
            <option value="Transportation">Transportation</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            required
            name="date"
            defaultValue={props.date}
          />
        </Col>
      </Row>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 12 }}>
          {/* SUBMIT EXPENSE */}
          <div
            style={
              props.showsubmit === 1
                ? { display: "flex", justifyContent: "end" }
                : { display: "none" }
            }
          >
            <Button
              //   type="null"
              variant="secondary"
              className="me-3"
              onClick={props.onHide}
            >
              Cancel
            </Button>
            <Button type="submit" variant="success" onClick={postExpenseData}>
              Submit Expense
            </Button>
          </div>

          {/* EDIT EXPENSE */}
          <div
            style={
              props.showsubmit === 1
                ? { display: "none" }
                : { display: "flex", justifyContent: "end" }
            }
          >
            <Button
              //   type="null"
              variant="secondary"
              className="me-3"
              onClick={props.onHide}
            >
              Cancel
            </Button>
            <Button type="submit" variant="success" onClick={editExpenseData}>
              Submit Change
            </Button>
          </div>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ExpenseForm;
