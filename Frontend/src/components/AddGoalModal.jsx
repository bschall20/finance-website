import React from "react";
// import ExpenseForm from "./ExpenseForm";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddGoalModal(props) {



    const postData = async (formTitle, formAmount, formDate) => {
        try {
          const response = await fetch("http://localhost:8000/goal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: formTitle,
              amount: parseFloat(formAmount),
              date: formDate
            }),
          });
          console.log(`This is the response: ${response}`);
        } catch (err) {
          console.log(err);
        }
      };
    
      const editData = async (formTitle, formAmount, formDate) => {
        // e.preventDefault();
        try {
          const response = await fetch(`http://localhost:8000/goal`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: props.id,
              title: formTitle,
              amount: parseFloat(formAmount),
              date: formDate
            }),
          });
          console.log(`edit has been clicked for ${response.title}`);
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
            Add Goal:
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <ExpenseForm
            title={props.title}
            amount={props.amount}
            expensetype={props.expensetype}
            id={props.id}
            date={props.date}
            showsubmit={false}
            postexpense={false}
            onHide={props.onHide}
          /> */}

          <Form
          //   onSubmit={HandleSubmit}
          >
            <Row className="mb-3">
              <Col>
                <Form.Group as={Col}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type=""
                    placeholder="Enter Goal Title"
                    required
                    name="title"
                    defaultValue={props.title}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Label>Amount to Save</Form.Label>
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
              {/* <Col>
                <Form.Label>Expense Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mb-3"
                  name="expense_type"
                  defaultValue={props.expensetype}
                >
                  <option value="SelectTypeOfExpense">
                    Select Type of Expense
                  </option>
                  <option value="Mortgage/Rent">Mortgage/Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Loans">Loans</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Food">Food</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Col> */}

              <Col>
                <Form.Label>Date to Save By</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="date"
                  defaultValue={props.date}
                />
              </Col>
            </Row>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 12 }}>
                <Button
                  type="submit"
                  variant="success"
                  style={props.showsubmit ? null : { display: "none" }}
                  onClick={postData}
                >
                  Submit Goal
                </Button>

                <div
                  style={
                    props.showsubmit
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
                  <Button
                    type="submit"
                    variant="success"
                    onClick={editData}
                  >
                    Submit Change
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

export default AddGoalModal;
