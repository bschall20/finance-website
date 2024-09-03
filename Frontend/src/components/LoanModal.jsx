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
    formStartDate,
    formLoanDate
  ) => {
    try {
      const response = await fetch("http://localhost:8000/loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          start_date: formStartDate,
          loan_date: formLoanDate,
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
    // formStartDate,
    formLoanDate
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
          // start_date: formStartDate,
          loan_date: formLoanDate,
        }),
      });
      console.log(`edit has been clicked for ${response.title}`);
    } catch (err) {
      console.log(err);
    }
  };

//   const todayDate = () => {
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();

//     if (dd < 10) {
//       dd = "0" + dd;
//     }
//     if (mm < 10) {
//       mm = "0" + mm;
//     }
//     return yyyy + "-" + mm + "-" + dd;
//   };


    // const [amountLeft, setAmountLeft] = useState(0)
    // function HandleChange(e){
    //     console.log(e.target.value)
    //     setAmountLeft(e.target.value);
    // }

  function HandleSubmit(e) {
    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    let formInterest = parseInt(e.target[2].value);
    let formStartDate = e.target[3].value;      // end date calculated in table
    let formTerm = e.target[4].value;

    if (props.postgoal === 1) {
      console.log("Post loan data called");
      return postLoanData(formTitle, formAmount, formInterest, formStartDate, formTerm);
    } else {
      return editLoanData(formTitle, formAmount, formInterest, formStartDate, formTerm);
      // return editLoanData(formTitle, formAmount, formInterest, formStartDate, formTerm, formBalanceLeft);
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
            <Row className="mb-3">
              <Col>
                <Form.Group as={Col}>
                  <Form.Label>Loan Title</Form.Label>
                  <Form.Control
                    type=""
                    placeholder="Enter Loan Title"
                    required
                    name="title"
                    defaultValue={props.title}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col>
                <Form.Label>Loan Amount</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    required
                    name="amount"
                    defaultValue={props.amount}
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
                    defaultValue={props.interest}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>

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
                    defaultValue={props.amount}
                  />
                </InputGroup>
              </Col>

            </Row>

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
