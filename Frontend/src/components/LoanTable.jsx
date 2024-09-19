import React, { useState, useEffect } from "react";
// import React from "react";
import Table from "react-bootstrap/Table";
import DeleteLoanModal from "./DeleteLoanModal.jsx";
import LoanModal from "./LoanModal.jsx";
import LoanProjectionModal from "./LoanProjectionTable.jsx";

import { GrView } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";



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
  const [loanProjectionModal, setLoanProjectionModal] = useState(false)

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
          return a.id - b.id;
        })
      );
      // Only needed if I decide to allow goal table sorting later (no need to)
      // setLoanCopy(
      //   loanJSON.sort(function (a, b) {
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

  // const termLeft = () => {
  //   return 60;
  // };

  useEffect(() => {
    getLoanData();
  }, []);

  // reference: https://www.investopedia.com/calculate-principal-and-interest-5211981
  // start date + term length months then find months from today until that day
  // payment =

  return (
    <Table striped bordered hover>
      <thead style={{borderTop: "solid 1px white"}}>
        <tr>
          <th style={{borderTop: "solid 1px #DEE2E6"}}>#</th>
          <th style={{borderTop: "solid 1px #DEE2E6"}}>Loan</th>
          <th style={{borderTop: "solid 1px #DEE2E6"}}>Starting Balance</th>
          <th style={{borderTop: "solid 1px #DEE2E6"}}>Term (months)</th>
          <th style={{borderTop: "solid 1px #DEE2E6"}}>Principal</th>
          {/* <th>
            Payment <span style={{ fontSize: ".75rem" }}>(+interest)</span>
          </th> */}
          <th style={{border: "none"}}></th>
          <th style={{border: "none"}}></th>
          <th style={{border: "none"}}></th>
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
              {/* <td>
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
              </td> */}
              <td
                className="tableView"
                style={{ paddingLeft: "0px", paddingRight: "0px", border: "none" }}
                onClick={() => {
                  setLoanProjectionModal(true);
                  setModalData(dataObj);
                  setModalNum(index + 1);
                }}
              >
                < GrView />
              </td>
              <td
                className="tableEdit"
                style={{ paddingLeft: "0px", paddingRight: "0px", border: "none" }}
                onClick={() => {
                  setLoanModalShow(true);
                  setModalData(dataObj);
                  setModalNum(index + 1);
                }}
              >
                < MdEdit />
              </td>

              <td
                className="tableDelete"
                style={{ paddingLeft: "0px", paddingRight: "0px", border: "none", borderRight: "solid 1px #DEE2E6" }}
                onClick={() => {
                  setDeleteLoanModalShow(true);
                  setModalData(dataObj);
                  setModalNum(index + 1);
                }}
              >
                < MdDelete />
              </td>
            </tr>
          );
        })}
        <LoanProjectionModal
          show={loanProjectionModal}
          onHide={() => setLoanProjectionModal(false)}
          id={modalData.id}
          num={modalNum}
          title={modalData.title}
          amount={modalData.amount}
          interest={modalData.interest}
          start_date={modalData.start_date}
          term={modalData.term}
          balance_left={modalData.balance_left}
          interest_type={modalData.interest_type}
        />
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
          interest_type={modalData.interest_type}
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
          interest_type={modalData.interest_type}
        />
      </tbody>
    </Table>
  );
}

export default LoanTracker;
