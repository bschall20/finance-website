import React, {useState} from "react";
// import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useCookies } from "react-cookie";


function IncomeModal(props) {
  // Ignore unused variables on next line:
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [paymentEnd, setPaymentEnd] = useState(false)

  const postIncomeData = async (
    formTitle,
    formAmount,
    formInterest,
    formStartDate,
    formTerm,
    formBalanceLeft,
    formInterestType
  ) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/income`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          interest: parseFloat(formInterest),
          start_date: formStartDate,
          term: parseFloat(formTerm),
          balance_left: parseFloat(formBalanceLeft),
          interest_type: formInterestType,
          person_email: cookies.Email,
        }),
      });
      console.log(`This is the response: ${response}`);
    } catch (err) {
      console.log(err);
    }
  };

  const editIncomeData = async (
    formTitle,
    formAmount,
    formInterest,
    formStartDate,
    formTerm,
    formBalanceLeft,
    formInterestType
  ) => {
    // e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/income`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          title: formTitle,
          amount: parseFloat(formAmount),
          interest: parseFloat(formInterest),
          start_date: formStartDate,
          term: parseFloat(formTerm),
          balance_left: parseFloat(formBalanceLeft),
          interest_type: formInterestType,
          person_email: cookies.Email,
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
    let formBalanceLeft = parseInt(e.target[2].value);
    let formStartDate = e.target[3].value; // end date calculated in table
    let formTerm = e.target[4].value;
    let formInterest = parseInt(e.target[5].value);
    let formInterestType = e.target[6].value;

    if (formInterestType === "SelectTypeOfIncome") {
      console.log("No entry - used default Select Type of Income.");
      alert("Entry not submitted. Please resubmit and choose a valid Interest Type.");
      return null;
    }
    if (props.postincome === 1) {
      console.log("Post income data called");
      return postIncomeData(
        formTitle,
        formAmount,
        formInterest,
        formStartDate,
        formTerm,
        formBalanceLeft,
        formInterestType
      );
    } else {
      return editIncomeData(
        formTitle,
        formAmount,
        formInterest,
        formStartDate,
        formTerm,
        formBalanceLeft,
        formInterestType
      );
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
            {props.edit_income === 1 ? "Edit Income" : "Add Income"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={HandleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type=""
              placeholder="Enter Income Title"
              required
              name="title"
              defaultValue={props.title}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Label>Amount Paid</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            {/* <Form.Control aria-label="Amount spent" /> */}
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              required
              name="amount"
              defaultValue={props.amount}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Label>Payment Interval</Form.Label>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            name="incomeinterval"
            defaultValue={props.incomeinterval}
          >
            <option value="SelectIncomeInterval" hidden>Select Income Payment Interval</option>
            <option value="OneTime">One Time</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="BiWeekly">Bi-Weekly</option>
            <option value="SemiMonthly">Semi-Monthly</option>
            <option value="Monthly">Monthly</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            required
            name="startdate"
            defaultValue={props.startdate}
          />
        </Col>
      </Row>

      <Row className="mb-4">
      <Col>
        <Form.Check // prettier-ignore
            type="checkbox"
            label="Payment no longer occurs."
            className="mt-3"
            onClick={() => setPaymentEnd(!paymentEnd)}
          />
        </Col>
        <Col>
        {paymentEnd === true ? <div>
        <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            required
            name="startdate"
            defaultValue={props.startdate}
          />
          </div> : null
        }
        </Col>
      </Row>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 12 }}>
          {/* SUBMIT INCOME or EDIT INCOME */}
          {props.postincome === 1 ? <div
            style={
              props.showsubmit === 1
                ? { display: "flex", justifyContent: "end" }
                : { display: "none" }
            }
          >
            <Button
              //   type="null"
              variant="secondary"
              className="me-3"
              onClick={props.onHide}
            >
              Cancel
            </Button>
            <Button type="submit" variant="success" onClick={postIncomeData}>
              Submit Income
            </Button>
          </div> : <div
            style={
              props.showsubmit === 1
                ? { display: "none" }
                : { display: "flex", justifyContent: "end" }
            }
          >
            <Button
              //   type="null"
              variant="secondary"
              className="me-3"
              onClick={props.onHide}
            >
              Cancel
            </Button>
            <Button type="submit" variant="success" onClick={editIncomeData}>
              Submit Change
            </Button>
          </div>
        }
        </Col>
      </Form.Group>
    </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default IncomeModal;
