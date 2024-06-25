import React from "react";
import PieChart from "../components/PieChart";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

function FinanceManagement() {
  //   var mortgage_rent = 0;
  //   var utilities = 0;
  //   var insurance = 0;
  //   var loans = 0;
  //   var transportation = 0;
  //   var food = 0;
  //   var other = 0;
  var series = [54, 25, 41, 17, 15, 85, 19];

  return (
    <div>
      <Form style={{ width: "50%" }} className="mx-auto mt-5">
        <Row className="mb-3">
          <Col>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control type="" placeholder="Enter Expense Title" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Label>Amount Spent</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control aria-label="Amount spent" />
              {/* <Form.Control aria-label="Amount (to the nearest dollar)" /> */}
              {/* <InputGroup.Text>.00</InputGroup.Text> */}
            </InputGroup>
          </Col>

          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows={1} />
          </Form.Group> */}
        </Row>

        <Form.Select aria-label="Default select example" className="mb-3">
          <option>Type of Expense</option>
          <option value="mortgage_rent">Mortgage/Rent</option>
          <option value="utilities">Utilities</option>
          <option value="insurance">Insurance</option>
          <option value="loans">Loans</option>
          <option value="transportation">Transportation</option>
          <option value="food">Food</option>
          <option value="other">Other</option>
        </Form.Select>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10 }}>
            <Button type="submit" variant="success">
              Submit Expense
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <p>This is the Finance Management page.</p>
      <div className="chart">
        <PieChart series={series} />
      </div>
    </div>
  );
}

export default FinanceManagement;
