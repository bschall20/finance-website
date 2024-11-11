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
  const [paymentEnd, setPaymentEnd] = useState(props.payment_interval)

  const postIncomeData = async (
    formTitle,
    formAmount,
    formPaymentInterval,
    formStartDate,
    formPaymentOccurring,
    formEndDate,
  ) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/income`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          payment_interval: formPaymentInterval,
          start_date: formStartDate,
          occurring: formPaymentOccurring,
          end_date: formEndDate,
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
    formPaymentInterval,
    formStartDate,
    formPaymentOccurring,
    formEndDate,
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
          payment_interval: formPaymentInterval,
          start_date: formStartDate,
          occurring: formPaymentOccurring,
          end_date: formEndDate,
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
    let formPaymentInterval = e.target[2].value;
    let formStartDate = e.target[3].value;
    let formPaymentOccurring = paymentEnd;
    let formEndDate = parseInt(e.target[5].value);

    if (formPaymentInterval === "SelectIncomeInterval") {
      alert("Entry not submitted. Please resubmit and choose a valid Payment Interval.");
      return null;
    }
    if (props.postincome === 1) {
      return postIncomeData(
        formTitle,
        formAmount,
        formPaymentInterval,
        formStartDate,
        formPaymentOccurring,
        formEndDate,
      );
    } else {
      return editIncomeData(
        formTitle,
        formAmount,
        formPaymentInterval,
        formStartDate,
        formPaymentOccurring,
        formEndDate,
      );
    }
  }

  const HandlePaymentInterval = () => {
    if (props.payment_interval === "on" || paymentEnd === "on"){
      setPaymentEnd(null)
    } else setPaymentEnd("on")
    console.log(paymentEnd)
  }

  // console.log(typeof props.payment_interval)
  console.log(typeof paymentEnd)

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
            name="payment_interval"
            defaultValue={props.payment_interval}
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
            defaultValue={props.start_date}
          />
        </Col>
      </Row>

      <Row className="mb-4">
      <Col>
        <Form.Check
            type="checkbox"
            label="Payment no longer occurs."
            className="mt-3"
            onClick={HandlePaymentInterval}
            defaultChecked={props.payment_interval === "on" ? "on" : null}
          />
        </Col>
        <Col>
        {paymentEnd === "on" ? <div>
        <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            required
            name="date"
            defaultValue={props.end_date}
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
