import React from "react";
import ExpenseForm from "./ExpenseForm";

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";

// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SubmitExpenseModal(props) {

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
            Add Expense:
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ExpenseForm
            showsubmit={1}
            postexpense={1}
            onHide={props.onHide}
          />
        </Modal.Body>

        {/* <Modal.Footer style={{display: "flex"}}>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button type="submit" variant="success" onClick={editData}>
            Submit Change
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default SubmitExpenseModal;
