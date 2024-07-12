import React, { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
//import sql from "../db.js"

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

function FinanceManagement() {


  const getData = async () => {
    try { 
      const response = await fetch(`http://localhost:8000/expense`);
      const expenseJSON = await response.json();
      console.log(expenseJSON)
      // console.log(expenseJSON[0].title);
      // console.log(parseInt(expenseJSON[0].amount));
      // console.log(expenseJSON[0].expense_type);
      // return (expenseJSON)
      setExpense(expenseJSON);
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => getData, [])

  const [expense, setExpense] = useState([])
  const [mortgageRent, setMortgageRent] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [loans, setLoans] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [food, setFood] = useState(0);
  const [other, setOther] = useState(0);
  const [series, setSeries] = useState([
    mortgageRent,
    utilities,
    insurance,
    loans,
    transportation,
    food,
    other,
  ]);

  useEffect(() => {
    getData();
    setSeries([
      mortgageRent,
      utilities,
      insurance,
      loans,
      transportation,
      food,
      other,
    ]);
  }, [mortgageRent, utilities, insurance, loans, transportation, food, other, ]);

  // useEffect(() => {
  //   setExpense(getData());
  //   setSeries([
  //     mortgageRent,
  //     utilities,
  //     insurance,
  //     loans,
  //     transportation,
  //     food,
  //     other,
  //   ]);
  // }, [mortgageRent, utilities, insurance, loans, transportation, food, other]);


  function HandleSubmit(e) {
    // let title = e.target[0].value;
    // let amount = parseInt(e.target[1].value);
    // let type = e.target[2].value;

    let title = expense[0].title;
    let amount = parseInt(expense[0].amount);
    let type = expense[0].expense_type;

    console.log(`Title: ${title}`);
    console.log(`Title type: ${typeof title}`);
    console.log(amount);
    console.log(`Amount type: ${typeof amount}`);
    console.log(type);
    console.log(`Type type: ${typeof type}`);

    if (type === "mortgage_rent") {
      setMortgageRent(mortgageRent + amount);
    } else if (type === "utilities") {
      setUtilities(utilities + amount);
    } else if (type === "insurance") {
      setInsurance(insurance + amount);
    } else if (type === "loans") {
      setLoans(loans + amount);
    } else if (type === "transportation") {
      setTransportation(transportation + amount);
    } else if (type === "food") {
      setFood(food + amount);
    } else if (type === "other") {
      setOther(other + amount);
    } else {
      alert("Please select a proper type.");
    }
    

    e.preventDefault();       // REMOVE ONCE DATA SUBMITS AND READS FROM A DB? REFRESHES PAGE WHICH IS FINE ONCE DATA SAVES.
  }

  return (
    <div>
      <Form
        style={{ width: "50%" }}
        className="mx-auto mt-5"
        onSubmit={HandleSubmit}
      >
        <Row className="mb-3">
          <Col>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control type="" placeholder="Enter Expense Title" required/>
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>Amount Spent</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              {/* <Form.Control aria-label="Amount spent" /> */}
              <Form.Control aria-label="Amount (to the nearest dollar)" required/>
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        
        <Form.Select aria-label="Default select example" className="mb-3">
          <option>Type of Expense</option>
          <option value="mortgage_rent">Mortgage/Rent</option>
          <option value="utilities">Utilities</option>
          <option value="insurance">Insurance</option>
          <option value="loans">Loans</option>
          <option value="transportation">Transportation</option>
          <option value="food">Food</option>
          <option value="other">Other</option>
        </Form.Select>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10 }}>
            <Button type="submit" variant="success">
              Submit Expense
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <p>This is the Finance Management page.</p>
      <div className="chart">
        <PieChart series={series} />
      </div>
    </div>
  );
}

export default FinanceManagement;
