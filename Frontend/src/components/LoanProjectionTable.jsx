// import React from "react";
import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

function LoanProjectionModal(props) {
  var principalTotal = 0;
  var interestTotal = 0;
  var totalSpent = 0;
  var balanceLeft;
  var principalFormatted;
  var interestFormatted;
  var totalFormatted;
  var finalPayment;

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

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //                    Create Loan Table Array
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const getPrincipal = () => {
    // To Fixed ensures 2 decimal places (ie. 0.8 = 0.80). This converts to string. If using elsewhere, parseFloat the return.
    return (Math.round((props.amount / props.term) * 100) / 100).toFixed(2);
  };

  const getInterest = () => {
    // To Fixed ensures 2 decimal places (ie. 0.8 = 0.80). This converts to string. If using elsewhere, parseFloat the return.
    if (props.interest_type === "APR") {
    } else if (props.interest_type === "Compound") {
    } else if (props.interest_type === "Discounted") {
    } else if (props.interest_type === "Fixed") {
      return (
        Math.round(getPrincipal() * (props.interest / 100) * 100) / 100
      ).toFixed(2);
    } else if (props.interest_type === "Prime") {
    } else if (props.interest_type === "Public") {
    } else if (props.interest_type === "Simple") {
    } else if (props.interest_type === "Variable") {
    }
  };

  const getTotalDue = () => {
    return (
      Math.round(
        (parseFloat(getPrincipal()) + parseFloat(getInterest())) * 100
      ) / 100
    ).toFixed(2);
  };

  // Get number (ie 80000.0) and convert to readable number (80,000.00)
  const formatNumber = (number) => {
    return (
      number
        .toFixed(2)
        .split(".")[0]
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      "." +
      number.toFixed(2).split(".")[1]
    );
  };

  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //                    Get Last Items of Table
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const getLastPrincipal = (totalDue, finalPay, index) => {
    if (index === props.term) {
      return finalPay;
    } else {
      return totalDue;
    }
  };

  const getLastTotalDue = (principal, interest, balanceLeft, index) => {
    if (index === props.term) {
      return formatNumber(balanceLeft + interest);
    } else {
      return formatNumber(principal + interest);
    }
  };

  // Get remaining balance and ensure balance left is never negative
  const getBalanceLeft = (balanceLeft, index) => {
    if (index === props.term) {
      return 0;
    } else {
      return formatNumber(parseFloat(balanceLeft));
    }
  };

  let loanTable = [];
  for (let i = 0; i < props.term; i++) {
    loanTable.push({
      id: i + 1,
      date: date[i],
      principal: getPrincipal(),
      interest: getInterest(),
      totalDue: getTotalDue(),
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
          <p>
            <span>Interest type:</span> {props.interest_type}
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
                      <th>Pay to Principal</th>
                      <th>Pay to Interest</th>
                      <th>Total Due</th>
                      <th>Balance Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanTable.map((dataObj, index) => {
                      interestTotal += parseFloat(dataObj.interest);
                    
                      if (index + 1 !== loanTable.length) {
                        principalTotal += parseFloat(dataObj.principal);
                        totalSpent += (parseFloat(dataObj.interest) + parseFloat(dataObj.principal));
                        balanceLeft =
                          props.amount -
                          parseFloat(dataObj.principal) * dataObj.id;
                      }
                      // Format number to have commas + 2 decimals + if last index, take total number and format it
                      else if (index + 1 === loanTable.length) {
                        principalTotal += balanceLeft;
                        totalSpent += (balanceLeft + parseFloat(dataObj.interest));
                        principalFormatted = formatNumber(principalTotal);
                        interestFormatted = formatNumber(interestTotal);
                        totalFormatted = formatNumber(totalSpent);

                        // Last balanceLeft as payment to principal left
                        finalPayment = formatNumber(balanceLeft);
                      }

                      return (
                        <tr key={index}>
                          <td>{dataObj.id}</td>
                          <td>{dataObj.date}</td>
                          {/* Principal */}
                          <td>
                            {getLastPrincipal(
                              formatNumber(parseFloat(dataObj.principal)),
                              finalPayment,
                              dataObj.id
                            )}
                          </td>
                          {/* Interest */}
                          <td>{formatNumber(parseFloat(dataObj.interest))}</td>
                          {/* Total (Principal payment + Interest payment) */}
                          <td>
                            {getLastTotalDue(
                              parseFloat(dataObj.principal),
                              parseFloat(dataObj.interest),
                              balanceLeft,
                              dataObj.id
                            )}
                          </td>
                          {/* Balance Left on loan */}
                          <td>{getBalanceLeft(balanceLeft, dataObj.id)}</td>
                        </tr>
                      );
                    })}
                    {/* Totals for whole table added: */}
                    <tr style={{ fontWeight: "900" }}>
                      <td>Total: </td>
                      <td></td>
                      <td>{principalFormatted}</td>
                      <td>{interestFormatted}</td>
                      <td>{totalFormatted}</td>
                      <td>0.00</td>
                    </tr>
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
