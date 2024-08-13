import React from "react";
// import ExpenseForm from "./ExpenseForm";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function GoalModal(props) {
  const postData = async (formTitle, formAmount, formStartDate, formGoalDate) => {
    try {
      const response = await fetch("http://localhost:8000/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          start_date: formStartDate,
          goal_date: formGoalDate
        }),
      });
      console.log(`This is the response: ${response}`);
    } catch (err) {
      console.log(err);
    }
  };

  const editData = async (formTitle, formAmount, formStartDate, formGoalDate) => {
    // e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/goal`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          title: formTitle,
          amount: parseFloat(formAmount),
          start_date: formStartDate,
          goal_date: formGoalDate
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
    let formStartDate = e.target[2].value;
    let formGoalDate = e.target[3].value;


    if (props.postgoal === 1) {
      console.log("Post goal data called");
      return postData(formTitle, formAmount, formStartDate, formGoalDate);
    } else {
      return editData(formTitle, formAmount, formStartDate, formGoalDate);
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
          <Form
            onSubmit={HandleSubmit}
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
                  defaultValue={props.startdate}
                />
              </Col>
              <Col>
                <Form.Label>Goal Finish Date</Form.Label>
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
                  <Button type="submit" variant="success" onClick={postData}>
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
                  <Button type="submit" variant="success" onClick={editData}>
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
