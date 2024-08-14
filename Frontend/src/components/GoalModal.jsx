import React from "react";
// import ExpenseForm from "./ExpenseForm";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function GoalModal(props) {
  const postGoalData = async (
    formTitle,
    formAmount,
    formStartDate,
    formGoalDate
  ) => {
    try {
      const response = await fetch("http://localhost:8000/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          start_date: formStartDate,
          goal_date: formGoalDate,
        }),
      });
      console.log(`This is the response: ${response}`);
    } catch (err) {
      console.log(err);
    }
  };

  const editGoalData = async (
    formTitle,
    formAmount,
    // formStartDate,
    formGoalDate
  ) => {
    // e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/goal`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          title: formTitle,
          amount: parseFloat(formAmount),
          // start_date: formStartDate,
          goal_date: formGoalDate,
        }),
      });
      console.log(`edit has been clicked for ${response.title}`);
    } catch (err) {
      console.log(err);
    }
  };

  const todayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  function HandleSubmit(e) {
    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    // let formStartDate = e.target[2].value;
    let formStartDate = todayDate();
    let formGoalDate = e.target[3].value;

    if (props.postgoal === 1) {
      console.log("Post goal data called");
      return postGoalData(formTitle, formAmount, formStartDate, formGoalDate);
    } else {
      return editGoalData(formTitle, formAmount, formGoalDate);
      // return editGoalData(formTitle, formAmount, formStartDate, formGoalDate);
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
            {props.editgoal === 1 ? "Edit Goal" : "Add Goal"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={HandleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group as={Col}>
                  <Form.Label>Goal Title</Form.Label>
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
                <Form.Label>Goal Amount</Form.Label>
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
            </Row>

            <Row>
              <Col>
                <Form.Label>Goal Start Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="startDate"
                  defaultValue={props.showsubmit === 1
                    ? todayDate() 
                    : props.startdate }
                  disabled
                />
              </Col>
              <Col>
                <Form.Label>Goal Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="endDate"
                  defaultValue={props.goaldate}
                />
              </Col>
            </Row>

            <Form.Group as={Row} className="mb-3 mt-3">
              <Col sm={{ span: 12 }}>
                <div
                  style={
                    props.showsubmit === 1
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
                  <Button type="submit" variant="success" onClick={postGoalData}>
                    Submit Goal
                  </Button>
                </div>

                <div
                  style={
                    props.showsubmit === 1
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
                  <Button type="submit" variant="success" onClick={editGoalData}>
                    Submit Goal Change
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

export default GoalModal;
