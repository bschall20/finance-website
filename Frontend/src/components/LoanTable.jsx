import React, { useState, useEffect } from "react";
// import React from "react";
import Table from "react-bootstrap/Table";
import DeleteLoanModal from "./DeleteLoanModal.jsx";
import LoanModal from "./LoanModal.jsx";

function LoanTracker(props) {
  // Display on view:
  // Name > Starting Amount > Interest > Start Date > Term (Months) > Balance Left > Payment (+interest) > Projected End Date?

  // Enter on add:
  // Name, Amount, Interest, Start Date, Term (Months)
  // Balance left after adding payment(s)
  // Can calculate:
  // Payment(+interest), Projected End Date? (use amount left - (original amount PAYMENT amount * term left)

  // Table only has:
  // Name > Principal (+ interest) >

  const [modalData, setModalData] = useState({});
  const [modalNum, setModalNum] = useState(0);
  const [loan, setLoan] = useState([]);
  const [deleteLoanModalShow, setDeleteLoanModalShow] = useState(false);
  const [loanModalShow, setLoanModalShow] = useState(false);

  const getLoanData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/loan`);
      const loanJSON = await response.json();
      setLoan(
        loanJSON.sort(function (a, b) {
          // Default sort by DATE:
          // var aa = a.start_date.split("/").reverse().join(),
          //   bb = b.start_date.split("/").reverse().join();
          // return aa < bb ? -1 : aa > bb ? 1 : 0;

          //Default sort by ID:
          return a - b;
        })
      );
      // Only needed if I decide to allow goal table sorting later (no need to)
      // setGoalCopy(
      //   goalJSON.sort(function (a, b) {
      //     // Default sort by DATE:
      //     var aa = a.date.split("/").reverse().join(),
      //       bb = b.date.split("/").reverse().join();
      //     return bb < aa ? -1 : bb > aa ? 1 : 0;
      //   })
      // );
    } catch (err) {
      console.log(err);
    }
  };

  // const payment = (amount, term) => {
  //   return (amount/term)
  // }

  const termLeft = () => {
    return 60;
  };

  useEffect(() => {
    getLoanData();
  }, []);

  // reference: https://www.investopedia.com/calculate-principal-and-interest-5211981
  // start date + term length months then find months from today until that day
  // payment =

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Loan</th>
          <th>Starting Balance</th>
          <th>Term (months)</th>
          <th>Principal</th>
          <th>
            Payment <span style={{ fontSize: ".75rem" }}>(+interest)</span>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {loan.map((dataObj, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dataObj.title}</td>
              <td>
                {dataObj.amount} at {dataObj.interest}%
              </td>
              <td>{dataObj.term}</td>
              <td>{dataObj.balance_left}</td>
              <td>
                {Math.round(
                  (dataObj.balance_left / termLeft() + Number.EPSILON) * 100
                ) / 100}{" "}
                (+
                {Math.round(
                  (dataObj.balance_left * (dataObj.interest / 100 / 12) +
                    Number.EPSILON) *
                    100
                ) / 100}
                )
              </td>
              <td
                className="tableEdit"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
                onClick={() => {
                  setLoanModalShow(true);
                  setModalData(dataObj);
                  setModalNum(index + 1);
                }}
              >
                edit
              </td>

              <td
                className="tableDelete"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
                onClick={() => {
                  setDeleteLoanModalShow(true);
                  setModalData(dataObj);
                  setModalNum(index + 1);
                }}
              >
                X
              </td>
            </tr>
          );
        })}
        <LoanModal
          show={loanModalShow}
          showsubmit={0}
          onHide={() => setLoanModalShow(false)}
          id={modalData.id}
          num={modalNum}
          title={modalData.title}
          amount={modalData.amount}
          interest={modalData.interest}
          start_date={modalData.start_date}
          term={modalData.term}
          balance_left={modalData.balance_left}
          edit_loan={1}
        />
        <DeleteLoanModal
          show={deleteLoanModalShow}
          onHide={() => setDeleteLoanModalShow(false)}
          id={modalData.id}
          num={modalNum}
          title={modalData.title}
          amount={modalData.amount}
          interest={modalData.interest}
          start_date={modalData.start_date}
          term={modalData.term}
          balance_left={modalData.balance_left}
        />
      </tbody>
    </Table>
  );
}

export default LoanTracker;
