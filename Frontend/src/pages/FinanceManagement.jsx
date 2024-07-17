import React, { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
//import sql from "../db.js"

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

function FinanceManagement() {

  // const [title, setTitle] = useState("howdy test");
  // const [amount, setAmount] = useState(0);
  // const [expenseType, setExpenseType] = useState("fake expense type");
  // const [data, setData] = useState({
  //   dataTitle: title,
  //   dataAmount: amount,
  //   dataType: expenseType
  // })

  const [data, setData] = useState({
    title: "",
    amount: "",
    expense_type: ""
  })

  const [expense, setExpense] = useState([])
  const [mortgageRent, setMortgageRent] = useState(1);
  const [utilities, setUtilities] = useState(1);
  const [insurance, setInsurance] = useState(1);
  const [loans, setLoans] = useState(1);
  const [transportation, setTransportation] = useState(1);
  const [food, setFood] = useState(1);
  const [other, setOther] = useState(1);
  const [series, setSeries] = useState([
    mortgageRent,
    utilities,
    insurance,
    loans,
    transportation,
    food,
    other,
  ]);

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

  const postData = async () => {
    try {
      const response = await fetch('http://localhost:8000/expense', {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          title: data.title,
          amount: parseFloat(data.amount),
          expense_type: data.expense_type
        })
      })
      console.log(`This is the response: ${response}`)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    postData();
    getData();

    // setTitle();
    // setAmount();
    // setExpenseType();
    // setData(title, amount, expenseType);
    // console.log(`This is current data title: ${data.dataTitle}`)
    // console.log(`This is current data amount: ${data.dataAmount}`)
    // console.log(`This is current data type: ${data.dataType}`)
    setSeries([
      mortgageRent,
      utilities,
      insurance,
      loans,
      transportation,
      food,
      other,
    ]);

  }, [mortgageRent, utilities, insurance, loans, transportation, food, other, data, ]);

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

    // setTitle(e.target[0].value);
    // setAmount(parseInt(e.target[1].value));
    // setExpenseType(e.target[2].value);

    // console.log(`HERE IS THE DATA: ${data}`)

    // console.log(`e.target: ${e.target}`)

    // let title = expense[0].title;
    // let amount = parseInt(expense[0].amount);
    // let type = expense[0].expense_type;


    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    let formType = e.target[2].value;


    setData({
      title: formTitle,
      amount: formAmount,
      expense_type: formType
    })

    // console.log(`HERE IS THE DATA: ${data}`)

    console.log(`Title: ${formTitle}`);
    console.log(`Title type: ${typeof formTitle}`);
    console.log(formAmount);
    console.log(`Amount type: ${typeof formAmount}`);
    console.log(formType);
    console.log(`Type type: ${typeof formType}`);

    if (formType === "mortgage_rent") {
      setMortgageRent(mortgageRent + formAmount);
    } else if (formType === "utilities") {
      setUtilities(utilities + formAmount);
    } else if (formType === "insurance") {
      setInsurance(insurance + formAmount);
    } else if (formType === "loans") {
      setLoans(loans + formAmount);
    } else if (formType === "transportation") {
      setTransportation(transportation + formAmount);
    } else if (formType === "food") {
      setFood(food + formAmount);
    } else if (formType === "other") {
      setOther(other + formAmount);
    } else {
      alert("Please select a proper type.");
    }

    postData();
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
              <Form.Control type="" placeholder="Enter Expense Title" required name="title"/>
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>Amount Spent</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              {/* <Form.Control aria-label="Amount spent" /> */}
              <Form.Control aria-label="Amount (to the nearest dollar)" required name="amount"/>
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        
        <Form.Select aria-label="Default select example" className="mb-3" name="expense_type">
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
        {/* insert a for every loop here through 'expense' hook to pull the type and amount for the chart */}
        <PieChart series={series} />
      </div>
    </div>
  );
}

export default FinanceManagement;
