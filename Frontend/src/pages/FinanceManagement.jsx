import React, { useState, useEffect } from "react";
import EditModal from "../components/EditModal"
import PieChart from "../components/PieChart";
//import sql from "../db.js"

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

import Table from "react-bootstrap/Table";

function FinanceManagement() {
  const [modalShow, setModalShow] = useState(false);
  const [expense, setExpense] = useState([]);
  let mortgage_rent = 0;
  let utilities = 0;
  let insurance = 0;
  let loans = 0;
  let transportation = 0;
  let food = 0;
  let other = 0;


  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/expense`);
      const expenseJSON = await response.json();
      console.log("expense JSON:");
      console.log(expenseJSON);
      setExpense(expenseJSON);
    } catch (err) {
      console.log(err);
    }
  };

  const postData = async (formTitle, formAmount, formType) => {
    try {
      const response = await fetch("http://localhost:8000/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          expense_type: formType,
        }),
      });
      console.log(`This is the response: ${response}`);
    } catch (err) {
      console.log(err);
    }
  };

  const editData = async(e, formTitle, formAmount, formType) => {
    // e.preventDefault();    
    try {
      const response = await fetch(`http://localhost:8000/expense`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          expense_type: formType,
        }),                               ///////////////////EDIT
      });
      console.log(`edit has been clicked for ${response.title}`);
      if (response.status === 200){
        console.log("reponse status is 200")
        //Insert show modal to false so modal goes away
        getData();
      }
    } catch (err){
      console.log(err);
    }

  };

  const deleteData = async(dataID) => {
    //  MAKE THIS CALL A MODAL TO VERIFY DELETE. DON'T JUST DELETE ON CLICK.
    try {
      const response = await fetch(`http://localhost:8000/expense`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: dataID
        }),
      });
      if (response.status === 200){
        getData();
      }
      // console.log(`delete has been clicked where id = `)
      // console.log(dataID)
    } catch (err){
      console.log(err);
    }
  };





  useEffect(() => {
    getData();
  }, [ ]);


  function editExpense(formID, formTitle, formAmount, formType) {
    console.log(`edit has been clicked for id: `);
    console.log(formID)
    setModalShow(true);

    return <EditModal 
      show={modalShow}
      onHide={() => setModalShow(false)}
      id = {formID}
      title = {formTitle}
      amount = {formAmount}
      expenseType = {formType}
    />
  }



  function HandleSubmit(e) {
    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    let formType = e.target[2].value;

    if (formType === "TypeOfExpense"){
      return null
    }
    else{ postData(formTitle, formAmount, formType); }
    //e.preventDefault(); // REMOVE ONCE DATA SUBMITS AND READS FROM A DB? REFRESHES PAGE WHICH IS FINE ONCE DATA SAVES.
  }

  expense.map((dataObj) => {
    // let formTitle = dataObj.title;
    let formAmount = dataObj.amount;
    let formType = dataObj.expense_type;
    //key = {index}

    if (formType === "Mortgage/Rent") {
      return (mortgage_rent += formAmount);
    } else if (formType === "Utilities") {
      return (utilities += formAmount);
    } else if (formType === "Insurance") {
      return (insurance += formAmount);
    } else if (formType === "Loans") {
      return (loans += formAmount);
    } else if (formType === "Transportation") {
      return (transportation += formAmount);
    } else if (formType === "Food") {
      return (food += formAmount);
    } else if (formType === "Other") {
      return (other += formAmount);
    } else {
      return console.log("null form entry");
    }
  });

  return (
    <div id="financeManagement">
      <Form
        // style={{ width: "50%" }}
        // className="mx-auto mt-5"
        onSubmit={HandleSubmit}
      >
        <Row className="mb-3">
          <Col>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type=""
                placeholder="Enter Expense Title"
                required
                name="title"
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
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Form.Select
          aria-label="Default select example"
          className="mb-3"
          name="expense_type"
        >
          <option value="TypeOfExpense">Type of Expense</option>
          <option value="Mortgage/Rent">Mortgage/Rent</option>
          <option value="Utilities">Utilities</option>
          <option value="Insurance">Insurance</option>
          <option value="Loans">Loans</option>
          <option value="Transportation">Transportation</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </Form.Select>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10 }}>
            <Button type="submit" variant="success" onClick={postData}>
              Submit Expense
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <div className="chart">
        <PieChart
          series={[
            mortgage_rent,
            utilities,
            insurance,
            loans,
            transportation,
            food,
            other,
          ]}
        />
      </div>

      <Table
        striped
        bordered
        hover
        style={{ margin: "3.5rem auto" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Expense Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expense
            ? expense.map((dataObj, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{dataObj.title}</td>
                    <td>{dataObj.amount}</td>
                    <td>{dataObj.expense_type}</td>
                    {/* <td className="tableEdit" style={{paddingLeft: '0px', paddingRight: '0px'}} onClick={editData}>edit</td> */}


                    {/* <td className="tableEdit" style={{paddingLeft: '0px', paddingRight: '0px'}} 
                    onClick={() => setModalShow(true)}>edit</td>
                    <EditModal 
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      // id = {dataObj.id}
                      number = {index + 1}
                      title = {dataObj.title}
                      amount = {dataObj.amount}
                      expensetype = {dataObj.expense_type}
                    /> */}
  
                      <td className="tableEdit" style={{paddingLeft: '0px', paddingRight: '0px'}} 
                      onClick={() => editExpense(dataObj.id, dataObj.title, dataObj.amount, dataObj.expense_type)}>edit</td>

                    <td className="tableDelete" style={{paddingLeft: '0px', paddingRight: '0px'}} onClick={() => deleteData(dataObj.id)}>X</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
}

export default FinanceManagement;
