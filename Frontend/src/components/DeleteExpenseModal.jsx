import React from "react";
import Modal from "react-bootstrap/Modal";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";

import Button from "react-bootstrap/Button";

function DeleteExpenseModal(props) {

  const deleteExpenseData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/expense`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
        }),
      });
      if (response.status === 200) {
        console.log("Delete successful.");
        props.onHide();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            Delete Expense:
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Are you sure you wish to DELETE the following entry:</h4>
          <p className="deleteTitle">
            {props.num}.) <span className="deleteInfo">{props.title}</span>
          </p>
          <p className="deleteTitle">Amount: <span className="deleteInfo">{props.amount}</span></p>
          <p className="deleteTitle">Expense Type: <span className="deleteInfo">{props.expensetype}</span></p>
          <p className="deleteTitle">Date: <span className="deleteInfo">{props.date}</span></p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">
            Close
          </Button>
          <Button onClick={deleteExpenseData} variant="danger">
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteExpenseModal;
