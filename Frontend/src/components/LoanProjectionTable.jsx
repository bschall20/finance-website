// import React, {useState} from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LoanProjectionModal(props) {
  // Find projected due date (term months from start date)
  const projectedDueDate = () => {
    var d = new Date(props.start_date);
    d.setMonth(d.getMonth() + props.term);
    return d.toLocaleDateString();
  };

  // Find payments left (todays date to projected date)
  const paymentsLeft = () => {
    var d = new Date(props.start_date);
    d.setMonth(d.getMonth() + props.term);
    d = d.toLocaleDateString();
    console.log(`D is: ${d}`)
    // Get dates
    var date1 = new Date(props.start_date);
    var date2 = new Date(d)
    // Separate numbers for formatting
    var y1 = date1.getFullYear();
    var m1 = date1.getMonth() + 1;
    var d1 = date1.getDate();
    var y2 = date2.getFullYear();
    var m2 = date2.getMonth() + 1;
    var d2 = date2.getDate();
    // Recollect numbers for correct format
    var dt1 = new Date(y1,m1,d1)
    var dt2 = new Date(y2,m2,d2)
    // Return month difference (payments left)
    const monthDiff = dt2.getMonth() - dt1.getMonth() + (12*(dt2.getFullYear() - dt1.getFullYear()));
    return monthDiff - 1
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
            Loan Projection Table
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>CONTENT GOES HERE</p>
          <p>Payments left: {paymentsLeft()}</p>
          <p>Projected due date: {projectedDueDate()}</p>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button variant="secondary" className="me-3" onClick={props.onHide}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoanProjectionModal;
