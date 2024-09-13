// import React from "react";
import React, { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

function LoanProjectionModal(props) {
  var totalPrincipal = 0;
  var totalInterest = 0;
  var totalPaid = 0;

  // Find projected due date (term months from start date)
  const projectedDueDate = () => {
    var d = new Date(props.start_date);
    d.setMonth(d.getMonth() + Math.ceil(props.term * (props.balance_left / props.amount)));
    return d.toLocaleDateString();
  };

  // Find payments left (todays date to projected date)
  // const paymentsLeft = () => {
  //   var d = new Date(props.start_date);
  //   d.setMonth(d.getMonth() + props.term);
  //   d = d.toLocaleDateString();
  //   // Get dates
  //   var date1 = new Date(props.start_date);
  //   var date2 = new Date(d);
  //   // Separate numbers for formatting
  //   var y1 = date1.getFullYear();
  //   var m1 = date1.getMonth() + 1;
  //   var d1 = date1.getDate();
  //   var y2 = date2.getFullYear();
  //   var m2 = date2.getMonth() + 1;
  //   var d2 = date2.getDate();
  //   // Recollect numbers for correct format
  //   var dt1 = new Date(y1, m1, d1);
  //   var dt2 = new Date(y2, m2, d2);
  //   // Return month difference (payments left)
  //   const monthDiff =
  //     dt2.getMonth() -
  //     dt1.getMonth() +
  //     12 * (dt2.getFullYear() - dt1.getFullYear());
  //   return monthDiff;
  // };

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

  // Get loan principal payments by AMOUNT/TERM(total months)
  const getPrincipal = (i) => {
    if (i === Math.ceil(props.term * (props.balance_left / props.amount))){
      // Find previous balance left to be PRINCIPAL payment to display properly to 0.00 final balance left
      return Math.round((props.balance_left - (Math.round((props.amount / props.term) * 100) / 100) * (i-1)) * 100) / 100
    }
    else { return Math.round((props.amount / props.term) * 100) / 100 }
    
  };

  // Get loan interest payments based on which interest type is selected
  const getInterest = () => {
    if (props.interest_type === "APR") {
    } else if (props.interest_type === "Compound") {
    } else if (props.interest_type === "Discounted") {
    } else if (props.interest_type === "Fixed") {
      return Math.round(getPrincipal() * (props.interest / 100) * 100) / 100;
    } else if (props.interest_type === "Prime") {
    } else if (props.interest_type === "Public") {
    } else if (props.interest_type === "Simple") {
    } else if (props.interest_type === "Variable") {
    }
  };

  // Get total due per payment by PRINCIPAL + INTEREST
  const getTotalDue = (i) => {
    return Math.round((getPrincipal(i) + getInterest()) * 100) / 100;
  };

  // Get balance left based on
  const getBalanceLeft = (i) => {
    // Solve balance left. If last row, return 0
    if (i === Math.ceil(props.term * (props.balance_left / props.amount))){
      return 0
    }
    else { return Math.round((props.balance_left - getPrincipal() * i) * 100) / 100 }
  };

  let loanTable = [];
  // Push into loan as long as
  for (let i = 1; i <= Math.ceil(props.term * (props.balance_left / props.amount)); i++) {
    loanTable.push({
      id: i,
      date: date[i - 1],
      principal: getPrincipal(i),
      interest: getInterest(),
      totalDue: getTotalDue(i),
      balanceLeft: getBalanceLeft(i),
    });
  }

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
            {/* Set this to the final term payment from loanTable */}
            <span>Estimated Payments Left:</span> {Math.ceil(props.term * (props.balance_left / props.amount))}
          </p>
          <p>
            <span>Estimated Due Date:</span> {projectedDueDate()}
          </p>
          <p>
            <span>Interest Type:</span> {props.interest_type}
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
                    {/* {loanTable.map((dataObj, index) => {
                      if (
                        props.balance_left -
                          parseFloat(dataObj.principal) * dataObj.id >
                        -200
                      ) {
                        interestTotal += parseFloat(dataObj.interest);
                        principalTotal += parseFloat(dataObj.principal);
                        totalSpent +=
                          parseFloat(dataObj.interest) +
                          parseFloat(dataObj.principal);
                        balanceLeft =
                          props.balance_left -
                          parseFloat(dataObj.principal) * dataObj.id;
                      }
                      // Format number to have commas + 2 decimals + if last index, take total number and format it
                      else {
                        principalTotal += balanceLeft;
                        totalSpent +=
                          balanceLeft + parseFloat(dataObj.interest);
                        principalFormatted = formatNumber(principalTotal);
                        interestFormatted = formatNumber(interestTotal);
                        totalFormatted = formatNumber(totalSpent);

                        // Last balanceLeft as payment to principal left
                        finalPayment = formatNumber(balanceLeft);
                        count = 1;
                      }
                      if (count === 0) {
                        return (
                          <tr key={index}>
                            <td>{dataObj.id}</td>
                            <td>{dataObj.date}</td>
                            Principal
                            <td>
                              {getLastPrincipal(
                                formatNumber(parseFloat(dataObj.principal)),
                                finalPayment,
                                dataObj.id
                              )}
                            </td>
                            Interest
                            <td>
                              {formatNumber(parseFloat(dataObj.interest))}
                            </td>
                            Total (Principal payment + Interest payment)
                            <td>
                              {getLastTotalDue(
                                parseFloat(dataObj.principal),
                                parseFloat(dataObj.interest),
                                balanceLeft,
                                dataObj.id
                              )}
                            </td>
                            Balance Left on loan
                            <td>{getBalanceLeft(balanceLeft, dataObj.id)}</td>
                          </tr>
                        );
                      }
                    })} */}

                    {loanTable.map((dataObj, index) => {
                      totalPrincipal += dataObj.principal;
                      totalInterest += dataObj.interest;

                      // Prevent total paid from being run every time except last run
                      if (index + 1 === loanTable.length) {
                        totalPaid += totalPrincipal + totalInterest;
                      }

                      return (
                        <tr key={index}>
                          <td>{dataObj.id}</td>
                          <td>{dataObj.date}</td>
                          <td>{formatNumber(dataObj.principal)}</td>
                          <td>{formatNumber(dataObj.interest)}</td>
                          <td>{formatNumber(dataObj.totalDue)}</td>
                          <td>{formatNumber(dataObj.balanceLeft)}</td>
                        </tr>
                      );
                    })}
                    {/* Totals for whole table added: */}
                    <tr style={{ fontWeight: "900" }}>
                      <td>Total: </td>
                      <td></td>
                      <td>{formatNumber(totalPrincipal)}</td>
                      <td>{formatNumber(totalInterest)}</td>
                      <td>{formatNumber(totalPaid)}</td>
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
