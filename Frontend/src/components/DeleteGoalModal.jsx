import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DeleteGoalModal(props) {
  const deleteGoalData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goal`, {
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
            Delete Goal
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Are you sure you wish to DELETE the following entry:</h4>
          <p className="deleteTitle">
            {props.num}.) <span className="deleteInfo">{props.title}</span>
          </p>
          <p className="deleteTitle">
            {props.deleteGoal === 1 ? "Goal Amount" : "Goal Amount:"}{" "}
            <span className="deleteInfo">{props.amount}</span>
          </p>
          <p className="deleteTitle">
            Start Date: <span className="deleteInfo">{props.startdate}</span>
          </p>
          <p className="deleteTitle">
            Goal Date: <span className="deleteInfo">{props.goaldate}</span>
          </p>
          <p className="deleteTitle">
            Days Left: <span className="deleteInfo">{props.daysleft}</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">
            Close
          </Button>
          <Button onClick={deleteGoalData} variant="danger">
            DELETE GOAL
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteGoalModal;
