// import React, { useState, useEffect, useCallback } from "react";
import React, { useState, useEffect } from "react";
import ExpensesTable from "./ExpensesTable";
// import LineChart from "./LineChart";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Accordion from "react-bootstrap/Accordion";
// import Table from "react-bootstrap/Table";

function ExpensesTableModal(props) {
  const [expense, setExpense] = useState([]);
  const [expenseCopy, setExpenseCopy] = useState([]);
  // let expenseCopy = props.expenseCopy;

  useEffect(() => {
    setExpense(props.expense);
    setExpenseCopy(props.expensecopy);
  }, [props.expense, props.expensecopy]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            All Expenses Table
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <ExpensesTable expense={expense} expenseCopy={expenseCopy} table={"full"}/>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="secondary"
              className="me-3 mt-3"
              onClick={props.onHide}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExpensesTableModal;
