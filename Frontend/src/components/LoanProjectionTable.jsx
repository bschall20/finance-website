////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// This file is a big work in progress for the types of loans.

// All commented out lines can be used in some way towards amortization
// tables of loan types. For now, all loans are showed as 1 amortization
// pay-back of payments made/payments due for a given schedule.

// Future plans may include tracking of where client is at on the loan in
// their cycle if they are ahead of schedule (or behind). For now, this
// will just be the given payments that the loan would have from the start.
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

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
  var balanceLeft = 0;

  // Format date from yyyy-mm-dd to mm/dd/yyyy
  const formatDate = (dt) => {
    var d = new Date(dt);
    return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  };

  // Find projected due date (term months from start date)
  const projectedDueDate = () => {
    var d = new Date(props.start_date);
    // d.setMonth(d.getMonth() + Math.ceil(props.term * (props.balance_left / props.amount) - 1));
    d.setMonth(d.getMonth() + props.term - 1);
    return d.toLocaleDateString();
  };

  // SAVE FOR LATER USE WHEN USING TYPES OF LOANS.
  // Find payments left (todays date to projected date)
  // Use to find months since loan start instead for loan interest calculations
  // const monthsDiff = () => {
  //   // var d = new Date(props.start_date);
  //   // d.setMonth(d.getMonth() + props.term);
  //   // d = d.toLocaleDateString();
  //   // Get dates
  //   var date1 = new Date(props.start_date);
  //   // var date2 = new Date(d);
  //   var date2 = new Date();
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
  //   // const monthDiff =
  //   //   dt2.getMonth() -
  //   //   dt1.getMonth() +
  //   //   12 * (dt2.getFullYear() - dt1.getFullYear());
  //   //   return monthDiff
  //     var months;
  //     months = (dt2.getFullYear() - dt1.getFullYear()) * 12;
  //     months -= dt1.getMonth();
  //     months += dt2.getMonth();
  //   return months <= 0 ? 0 : months;
  // };

  const [date, setDate] = useState([]);
  const dateRange = useCallback(() => {
    // UTC so timezone isn't needed + set start date 1 month ahead of noted start (first payment due)
    var s = new Date(props.start_date); // delete prop to get from todays date. This is causing older loans to have wrong dates
    var start = new Date(s.setMonth(s.getMonth()));
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
          // props.start_date.slice(8, 10) - 1,
          props.start_date.slice(8, 10),
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

  // AMORTIZATION VARIABLES:
  var monthlyPayment =
    props.amount *
    (((props.interest / 100 / 12) *
      Math.pow(1 + props.interest / 100 / 12, props.term)) /
      (Math.pow(1 + props.interest / 100 / 12, props.term) - 1));
  var outstandingBalance;
  var returnPrincipal =
    monthlyPayment - props.amount * (props.interest / 100 / 12);

  // Get loan principal payments by AMOUNT/TERM(total months)
  const getPrincipal = (i) => {
    // What is returned as principal payment
    // if (i === props.term){
    //   // Find previous balance left to be PRINCIPAL payment to display properly to 0.00 final balance left
    //   return getBalanceLeft(i-1)
    // }
    // else if (i === 1){
    // else { return Math.round((props.amount / props.term) * 100) / 100 }

    // Save for later use for Simple
    // if (props.interest_type === "Simple"){
    //   return (props.amount/props.term)
    // }

    if (i === 1) {
      outstandingBalance =
        props.amount -
        (monthlyPayment - props.amount * (props.interest / 100 / 12));
      return monthlyPayment - props.amount * (props.interest / 100 / 12);
    } else {
      returnPrincipal =
        monthlyPayment - outstandingBalance * (props.interest / 100 / 12);
      outstandingBalance =
        outstandingBalance -
        (monthlyPayment - outstandingBalance * (props.interest / 100 / 12));
      return returnPrincipal;
    }
  };

  // Get loan interest payments based on which interest type is selected
  // let a = 0;
  // let count = monthsDiff();
  const getInterest = (i) => {
    // if (props.interest_type === "APR") {
    //   // APR = i/12
    //   // return monthsDiff();
    //   // APR = monthsDiff();
    //   // console.log(APR)
    //   // console.log(monthsDiff())
    // }
    // else if (props.interest_type === "Compound") {
    //   // return (props.amount * (1+(props.interest/100)^(props.term/12))-props.amount)
    //   return (props.amount * (Math.pow((1+(props.interest/100)), (props.term/12)))-props.amount)/props.term
    // } else if (props.interest_type === "Discounted") {
    //   return 0
    // } else if (props.interest_type === "Fixed") {
    //   // return Math.round(getPrincipal() * (props.interest / 100) * 100) / 100;
    //   // return Math.round((props.interest/100)*getPrincipal(i)/(1-(1+(props.interest/100))^(props.term)))
    //   // return ((props.interest/100)/12)*getBalanceLeft(i-1)
    //   //return ((props.amount*((props.interest/100)/12))/(1-(Math.pow((1+(props.interest/100)), (-1*props.term)))))
    //   return (monthlyPayment - returnPrincipal)
    // } else if (props.interest_type === "Prime") {
    //   return 0
    // } else if (props.interest_type === "Public") {
    //   return 0
    // } else if (props.interest_type === "Simple") {
    //   // return ((props.interest/100)*(props.term/12))*props.amount ====> gets total interest due
    //   return ((props.interest/100)/12)*props.amount
    // } else if (props.interest_type === "Variable") {
    //   return 0
    // }
    return monthlyPayment - returnPrincipal;

    // APR for later use
    //// APR set interest every year from start date
    // if (monthsDiff() === 0 && i === 1){
    //   a = props.balance_left * (props.interest/100)/props.term;
    // }
    // else if (count > 0 && count < 12){
    //   a = getBalanceLeft(0) * (props.interest/100)/props.term;
    //   count --;
    // }
    // else if ((i-1) % 12 === 0){
    //   a = getBalanceLeft(i-1) * (props.interest/100)/props.term;
    // }
    //// No 'else' or else all segments between interest setting index will be the 'else' value.

    // return a;
  };

  // Get total due per payment by PRINCIPAL + INTEREST
  const getTotalDue = (i) => {
    // return Math.round((getPrincipal(i) + getInterest(i)) * 100) / 100;

    // Save for later when introducing all types of loans
    // if (props.interest_type === "Simple"){
    //   return getPrincipal(i) + getInterest(i)
    // } else {return monthlyPayment}

    return monthlyPayment;
  };

  // Get balance left on loan after payment is made
  const getBalanceLeft = (i) => {
    // Solve balance left. If last row, return 0
    // if (i === Math.ceil(props.term * (props.balance_left / props.amount))){
    //   return 0
    // }
    // else { return Math.round((props.balance_left - getPrincipal() * i) * 100) / 100 }

    // Saving for interest types later. Simple here:
    // if (props.interest_type === "Simple"){
    //   return Math.round((props.amount - getPrincipal() * i) * 100) / 100
    // } else {return Math.round((outstandingBalance) * 100) / 100}
    if (i === props.term){
      return 0
    // } else {return Math.round((props.amount - getPrincipal() * i) * 100) / 100}
    } else {return Math.round((outstandingBalance) * 100) / 100}
  };

  // Set up loan table for use in table format
  let loanTable = [];
  let paymentsTable = [];
  // Push into loan table as long as i < terms left on payment (takes % of payment left to get same % of terms left based on payments)
  // for (let i = 1; i <= Math.ceil(props.term * (props.balance_left / props.amount)); i++) {
  for (let i = 1; i <= props.term; i++) {
    loanTable.push({
      id: i,
      date: formatDate(date[i - 1]),
      principal: getPrincipal(i),
      interest: getInterest(i),
      totalDue: getTotalDue(i),
      balanceLeft: getBalanceLeft(i),
    });
  }

  // If loanTable[0] date is before today, remove as payment should be done
  // var today = new Date();
  // if (today.toISOString().split('T')[0] > props.start_date){
  //   // console.log(monthsDiff()+1)
  //   loanTable.splice(0, monthsDiff()+1)
  // }

  // Currently deleting every other array before todays date because it is deleting, lowering length, and next index is going to
  // previously read index
  for (let i = loanTable.length; i >= 0; i--) {
    let today = new Date();
    let d = new Date();
    if (loanTable[i]) {
      d = new Date(loanTable[i].date);
    }
    // const today = new Date();
    // const d = new Date (loanTable[i].date);
    if (d < today) {
      // paymentsTable.unshift(loanTable[i]);     => if I want oldest payment first
      paymentsTable.push(loanTable[i]);
      loanTable.splice(i, 1);
    }
  }

  // Get number (ie 80000.0) and convert to readable number string (80,000.00)
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
            {/* <span>Estimated Payments Left:</span> {Math.ceil(props.term * (props.balance_left / props.amount))} */}
            <span>Estimated Payments Left:</span> {loanTable.length}
          </p>
          <p>
            <span>Start Date:</span> {formatDate(props.start_date)}
            {/* <span>Start Date:</span> {new Date(props.start_date).getMonth() + 1 + '/' + new Date(props.start_date).getDate() + '/' + new Date(props.start_date).getFullYear()} */}
          </p>
          <p>
            <span>Estimated Final Payment:</span> {projectedDueDate()}
          </p>
          <p>
            <span>Interest Type:</span> {props.interest_type}
          </p>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Payments Made</Accordion.Header>
              {/* Payments Made: */}
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
                    {paymentsTable.map((dataObj, index) => {
                      totalPrincipal += dataObj.principal;
                      totalInterest += dataObj.interest;

                      if (index === 0) {
                        balanceLeft = dataObj.balanceLeft;
                      }

                      // Prevent total paid from being run every time except last run
                      if (index + 1 === paymentsTable.length) {
                        totalPaid += totalPrincipal + totalInterest;
                        // balanceLeft = dataObj.balanceLeft
                      }

                      return (
                        <tr key={index}>
                          {/* <td>{index + 1} is {dataObj.id}</td> */}
                          <td>{index + 1}</td>
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
                      <td>{formatNumber(balanceLeft)}</td>
                    </tr>
                  </tbody>
                </Table>
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
                          {/* <td>{index + 1} is {dataObj.id}</td> */}
                          <td>{index + 1}</td>
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
