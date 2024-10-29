import React, {useState, useEffect} from "react";
// import React, {useState} from "react";
// import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function GoalModal(props) {
  const [checkBox, setCheckBox] = useState(null);

  useEffect(() => {
    if (props.completed === "on"){
      setCheckBox("on")
    }
  }, [props.completed]);


  const postGoalData = async (
    formTitle,
    formAmount,
    formStartDate,
    formGoalDate,
    formCompleted
  ) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          amount: parseFloat(formAmount),
          start_date: formStartDate,
          goal_date: formGoalDate,
          completed: formCompleted,
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
    formGoalDate,
    formCompleted
  ) => {
    // e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goal`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: props.id,
          title: formTitle,
          amount: parseFloat(formAmount),
          // start_date: formStartDate,
          goal_date: formGoalDate,
          completed: formCompleted,
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
    // e.preventDefault();
    let formTitle = e.target[0].value;
    let formAmount = parseInt(e.target[1].value);
    // let formStartDate = e.target[2].value;
    let formStartDate = todayDate();
    let formGoalDate = e.target[3].value;
    // let formCompleted = e.target[4].value;
    let formCompleted = checkBox;

    if (props.postgoal === 1) {
      console.log("Post goal data called");
      return postGoalData(formTitle, formAmount, formStartDate, formGoalDate, formCompleted);
    } else {
      return editGoalData(formTitle, formAmount, formGoalDate, formCompleted);
      // return editGoalData(formTitle, formAmount, formStartDate, formGoalDate, formCompleted);
    }
  }


  const checkBoxToggle = () => {
    if (checkBox === "on"){
      setCheckBox(null)
    } else (setCheckBox("on"))
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
                  defaultValue={props.postgoal === 1
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


            <Row className="pt-4">
            {/* <Col></Col> */}
            <Col>
              <Form.Check
                type="checkbox"
                name="completed"
                label={'Completed'}
                onClick={checkBoxToggle}
                defaultChecked={props.completed}
                // defaultValue={checkedBox ? checked="true" : null }
              />
              </Col>
            </Row>

            <Form.Group as={Row} className="mb-3 mt-3">
              <Col sm={{ span: 12 }}>
                <div
                  style={
                    props.postgoal === 1
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
                    props.postgoal === 1
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
