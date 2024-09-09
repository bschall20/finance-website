import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteLoanModal(props) {
  const deleteLoanData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/loan`, {
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
            Delete Loan
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Are you sure you wish to DELETE the following entry:</h4>
          <p className="deleteTitle">
            {props.num}.) <span className="deleteInfo">{props.title}</span>
          </p>
          <p className="deleteTitle">
            {/* {props.deleteGoal === 1 ? "Loan Amount" : "Loan Amount:"}{" "} */}
            Loan Amount: <span className="deleteInfo"> {props.amount}</span>
          </p>
          <p className="deleteTitle">
            Interest: <span className="deleteInfo"> {props.interest}</span>
          </p>
          <p className="deleteTitle">
            Start Date: <span className="deleteInfo">{props.start_date}</span>
          </p>
          <p className="deleteTitle">
            Term: <span className="deleteInfo">{props.term}</span>
          </p>
          <p className="deleteTitle">
            Balance Left: <span className="deleteInfo">{props.balance_left}</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">
            Close
          </Button>
          <Button onClick={deleteLoanData} variant="danger">
            DELETE LOAN
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteLoanModal;
