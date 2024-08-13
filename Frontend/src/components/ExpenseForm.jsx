// import React, { useState, useEffect } from "react";
// import React, { useEffect } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";


function ExpenseForm(props) {
  const postData = async (formTitle, formAmount, formType, formDate) => {
    try {
      const response = await fetch("http://localhost:8000/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          expense_type: formType,
          date: formDate,
        }),
      });
      console.log(`This is the response: ${response}`);
    } catch (err) {
      console.log(err);
    }
  };

  const editData = async (formTitle, formAmount, formType, formDate) => {
    try {
      const response = await fetch(`http://localhost:8000/expense`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          title: formTitle,
          amount: parseFloat(formAmount),
          expense_type: formType,
          date: formDate,
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

  function HandleSubmit(e) {
    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    let formType = e.target[2].value;
    let formDate = e.target[3].value;

    if (formType === "SelectTypeOfExpense") {
      console.log("No entry - used default Select Type of Expense.");
      return null;
    }
    if (props.postexpense === true) {
      console.log("Post data called");
      return postData(formTitle, formAmount, formType, formDate);
    } else {
      return editData(formTitle, formAmount, formType, formDate);
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
            <option value="SelectTypeOfExpense">Select Type of Expense</option>
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
          <Button
            type="submit"
            variant="success"
            style={props.showsubmit ? null : { display: "none" }}
            onClick={postData}
          >
            Submit Expense
          </Button>

          <div
            style={
              props.showsubmit
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
            <Button type="submit" variant="success" onClick={editData}>
              Submit Change
            </Button>
          </div>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ExpenseForm;
