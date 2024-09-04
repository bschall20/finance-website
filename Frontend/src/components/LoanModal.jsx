// import React, {useState} from "react";
import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function LoanModal(props) {
  const postLoanData = async (
    formTitle,
    formAmount,
    formInterest,
    formStartDate,
    formTerm,
    formBalanceLeft
  ) => {
    try {
      const response = await fetch("http://localhost:8000/loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          interest: parseFloat(formInterest),
          start_date: formStartDate,
          term: parseFloat(formTerm),
          balance_left: parseFloat(formBalanceLeft)
        }),
      });
      console.log(`This is the response: ${response}`);
    } catch (err) {
      console.log(err);
    }
  };

  const editLoanData = async (
    formTitle,
    formAmount,
    formInterest,
    formStartDate,
    formTerm,
    formBalanceLeft
  ) => {
    // e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/loan`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          title: formTitle,
          amount: parseFloat(formAmount),
          interest: parseFloat(formInterest),
          start_date: formStartDate,
          term: parseFloat(formTerm),
          balance_left: parseFloat(formBalanceLeft)
        }),
      });
      console.log(`edit has been clicked for ${response.title}`);
    } catch (err) {
      console.log(err);
    }
  };


  function HandleSubmit(e) {
    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    let formInterest = parseInt(e.target[2].value);
    let formStartDate = e.target[3].value;      // end date calculated in table
    let formTerm = e.target[4].value;
    let formBalanceLeft = parseInt(e.target[5].value);

    if (props.postloan === 1) {
      console.log("Post loan data called");
      return postLoanData(formTitle, formAmount, formInterest, formStartDate, formTerm, formBalanceLeft);
    } else {
      // return editLoanData(formTitle, formAmount, formInterest, formStartDate, formTerm);
      return editLoanData(formTitle, formAmount, formInterest, formStartDate, formTerm, formBalanceLeft);
    }
  }

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
            {props.editloan === 1 ? "Edit Loan" : "Add Loan"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={HandleSubmit}>
            {/* Loan TITLE Row */}
            <Row className="mb-3">
              <Col>
                <Form.Group as={Col}>
                  <Form.Label>Loan Title</Form.Label>
                  <Form.Control
                    type=""
                    placeholder="Enter Loan Title"
                    required
                    name="title"
                    // defaultValue={props.title}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Loan AMOUNT + INTEREST Row */}
            <Row>
            <Col>
                <Form.Label>Loan Amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    required
                    name="amount"
                    // defaultValue={props.amount}
                  />
                  <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col>
                <Form.Label>Interest</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Loan Interest"
                    required
                    name="interest"
                    // defaultValue={props.interest}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            {/* Loan DATE + TERM Row */}
            <Row>
            <Col>
                <Form.Label>Loan Start Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="endDate"
                  // defaultValue={props.loandate}
                />
              </Col>
              <Col>
                <Form.Label>Term (Months)</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Term of Loan in Months"
                    required
                    name="term"
                    // defaultValue={props.amount}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
            <Col>
                <Form.Label>Balance Left</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="Loan Balance Left"
                    required
                    name="term"
                    // defaultValue={props.amount}
                  />
                </InputGroup>
              </Col>
            </Row>

            {/* SUBMIT or CHANGE button */}
            <Form.Group as={Row} className="mb-3 mt-3">
              <Col sm={{ span: 12 }}>
                <div
                  style={
                    props.postloan === 1
                      ? { display: "flex", justifyContent: "end" }
                      : { display: "none" }
                  }
                >
                  <Button
                    variant="secondary"
                    className="me-3"
                    onClick={props.onHide}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="success" onClick={postLoanData}>
                    Submit Loan
                  </Button>
                </div>

                <div
                  style={
                    props.postloan === 1
                      ? { display: "none" }
                      : { display: "flex", justifyContent: "end" }
                  }
                >
                  <Button
                    variant="secondary"
                    className="me-3"
                    onClick={props.onHide}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="success" onClick={editLoanData}>
                    Submit Loan Change
                  </Button>
                </div>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoanModal;
