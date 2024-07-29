import React, { useState, useEffect } from "react";
import EditModal from "../components/EditModal";
import PieChart from "../components/PieChart";
//import sql from "../db.js"
import ExpenseForm from "../components/ExpenseForm";

// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";

import Table from "react-bootstrap/Table";

function FinanceManagement() {
  const [modalShow, setModalShow] = useState(false);
  const [expense, setExpense] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalNum, setModalNum] = useState(0);
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

  // Sort data by ID # because it got out of order somehow? Look into.
  expense.sort(function (a, b) {
    return parseFloat(a.id) - parseFloat(b.id);
  });




  const deleteData = async (dataID) => {
    //  MAKE THIS CALL A MODAL TO VERIFY DELETE. DON'T JUST DELETE ON CLICK.
    try {
      const response = await fetch(`http://localhost:8000/expense`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: dataID,
        }),
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);



  // MAP THROUGH DATA TO GRAB IT AND SET TOTAL AMOUNTS FOR PIE CHART.
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
      <ExpenseForm 
      postexpense={true}
      showsubmit={true}
      />

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

      <Table striped bordered hover style={{ margin: "3.5rem auto" }}>
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
                    <td
                      className="tableEdit"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                      onClick={() => {
                        setModalShow(true);
                        setModalData(dataObj);
                        setModalNum(index + 1);
                      }}
                    >
                      edit
                    </td>

                    <td
                      className="tableDelete"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                      onClick={() => deleteData(dataObj.id)}
                    >
                      X
                    </td>
                  </tr>
                );
              })
            : null}
          <EditModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            expensetype={modalData.expense_type}
            // postexpense={false}
            // setexpense={() => setExpense}
            // getdata={() => getData()}
            // handlesubmit={() => HandleSubmit()}
            // editdata={() => editData()}
          />
        </tbody>
      </Table>
    </div>
  );
}

export default FinanceManagement;
