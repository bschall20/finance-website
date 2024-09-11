// import React from "react";
import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

function LoanProjectionModal(props) {
  // Find projected due date (term months from start date)
  const projectedDueDate = () => {
    var d = new Date(props.start_date);
    d.setMonth(d.getMonth() + props.term);
    return d.toLocaleDateString();
  };

  // Find payments left (todays date to projected date)
  const paymentsLeft = () => {
    var d = new Date(props.start_date);
    d.setMonth(d.getMonth() + props.term);
    d = d.toLocaleDateString();
    // Get dates
    var date1 = new Date(props.start_date);
    var date2 = new Date(d);
    // Separate numbers for formatting
    var y1 = date1.getFullYear();
    var m1 = date1.getMonth() + 1;
    var d1 = date1.getDate();
    var y2 = date2.getFullYear();
    var m2 = date2.getMonth() + 1;
    var d2 = date2.getDate();
    // Recollect numbers for correct format
    var dt1 = new Date(y1, m1, d1);
    var dt2 = new Date(y2, m2, d2);
    // Return month difference (payments left)
    const monthDiff =
      dt2.getMonth() -
      dt1.getMonth() +
      12 * (dt2.getFullYear() - dt1.getFullYear());
    return monthDiff;
  };

  // const [loanTable, setLoanTable] = useState([]);
  // const loanSetUp = () => {
  //   for (let i = 0; i < props.term; i++){
  //     loanTable.push({
  //       "id": i,
  //       "date": "2024-08-08",
  //       "principal": 100,
  //       "interest": 10,
  //       "total": 110,
  //     })
  //   }
  // }
  const [date, setDate] = useState([]);
  const dateRange = useCallback(() => {
    // UTC so timezone isn't needed + set start date 1 month ahead of noted start (first payment due)
    var s = new Date(props.start_date);
    let start = new Date(s.setMonth(s.getMonth() + 1));
    var d = new Date(props.start_date);
    d.setMonth(d.getMonth() + props.term + 1);
    const end = new Date(d.toLocaleDateString()).setUTCHours(12);
    const dates = [];
    while (start <= end) {
      // compensate for zero-based months in display
      const displayMonth = start.getUTCMonth() + 1;
      dates.push(
        [
          start.getUTCFullYear(),
          // Add leading 0 to month
          displayMonth.toString().padStart(2, "0"),
          // Always show date due (based on start date)
          props.start_date.slice(8, 10) - 1,
          // '01',
        ].join("-")
      );
      // progress the start date by one month
      start = new Date(start.setUTCMonth(displayMonth));
    }
    setDate(dates);
  }, [props.start_date, props.term]);



  
  const getPrincipal = () => {
    return Math.round((props.amount / props.term) * 100) / 100;
  };
  // Make this function multiple times but for each interest type
  const getInterest = () => {
    return Math.round(getPrincipal() * (props.interest / 100) * 100) / 100;
  };
  const getTotal = () => {
    return Math.round((getPrincipal() + getInterest()) * 100) / 100;
  };

  let loanTable = [];
  for (let i = 0; i < props.term; i++) {
    loanTable.push({
      id: i + 1,
      date: date[i],
      principal: getPrincipal(),
      interest: getInterest(),
      total: getTotal(),
    });
  }

  useEffect(() => {
    dateRange();
  }, [dateRange]);

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
            Loan Projection Table
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <span>Payments left:</span> {paymentsLeft()}
          </p>
          <p>
            <span>Projected due date:</span> {projectedDueDate()}
          </p>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Payments Made</Accordion.Header>
              {/* Payments Made: */}
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Payments Left</Accordion.Header>
              <Accordion.Body>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Principal</th>
                      <th>Interest</th>
                      <th>Total Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanTable.map((dataObj, index) => {
                      return (
                        <tr key={index}>
                          <td>{dataObj.id}</td>
                          <td>{dataObj.date}</td>
                          <td>{dataObj.principal}</td>
                          <td>{dataObj.interest}</td>
                          <td>{dataObj.total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="secondary"
              className="me-3 mt-3"
              onClick={props.onHide}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoanProjectionModal;
