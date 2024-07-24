import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal(props) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

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
            {/* {console.log("Modal should be showing.")} */}
          </Modal.Title>
        </Modal.Header>


        <Modal.Body>
          <h4>{props.num}. {props.title}</h4>
          <p>Amount: {props.amount}</p>
          <p>Expense Type: {props.expensetype}</p>
        </Modal.Body>


        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          {/* Add save button that closes on click but also saves to db on update */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
