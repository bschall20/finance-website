import React from "react";
import ExpenseForm from "./ExpenseForm";
import Modal from "react-bootstrap/Modal";

function EditExpenseModal(props) {

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
            Edit Expense:
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ExpenseForm
            title={props.title}
            amount={props.amount}
            expensetype={props.expensetype}
            id={props.id}
            date={props.date}
            showsubmit={false}
            postexpense={false}
            onHide={props.onHide}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditExpenseModal;
