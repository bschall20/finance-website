import React, { useState, useEffect } from "react";
import EditExpenseModal from "./EditExpenseModal";
import DeleteExpenseModal from "./DeleteExpenseModal";
import ExpensesTableModal from "./ExpensesTableModal";

import IncomeModal from "../Income/IncomeModal";

import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { GrView } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function ExpensesTable(props) {
  const [editExpenseModalShow, setEditExpenseModalShow] = useState(false);
  const [deleteExpenseModalShow, setDeleteExpenseModalShow] = useState(false);
  const [incomeModalShow, setIncomeModalShow]= useState(false);
  const [defaultTitleSearch, setDefaultTitleSearch] = useState("");
  const [defaultDate, setDefaultDate] = useState("");
  const [modalData, setModalData] = useState({});
  const [modalNum, setModalNum] = useState(0);
  const [expenseAllTableModal, setExpenseAllTableModal] = useState(false)

  const [expense, setExpense] = useState([]);
  // const [latestExpense, setLatestExpenses] = useState();
  let expenseCopy = props.expenseCopy;

  useEffect(() => {
    setExpense(props.expense);

    // Let client see latest X expenses with this function for main page
    // setLatestExpenses(props.expenseCopy.sort(function (a, b) {
    //   // Default sort by DATE:
    //   var aa = a.date.split("/").reverse().join(),
    //     bb = b.date.split("/").reverse().join();
    //   return bb < aa ? -1 : bb > aa ? 1 : 0;
    // }))

  }, [props.expense, props.expenseCopy]);


  // Table string comparator to all lower case
  const compareStrings = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
  };

  // Sort table by ID
  // const [IDOrder, setIDOrder] = useState(0);
  // const idSort = () => {
  //   if (IDOrder === 0) {
  //     expense.sort(function (a, b) {
  //       return parseFloat(a.id) - parseFloat(b.id);
  //     });
  //     setIDOrder(1);
  //   } else {
  //     expense.sort(function (a, b) {
  //       return parseFloat(b.id) - parseFloat(a.id);
  //     });
  //     setIDOrder(0);
  //   }
  // };

  // Sort table by TITLE
  const [titleOrder, setTitleOrder] = useState(0);
  const titleSort = () => {
    if (titleOrder === 0) {
      expense.sort(function (a, b) {
        return compareStrings(a.title, b.title);
      });
      setTitleOrder(1);
    } else {
      expense.sort(function (a, b) {
        return compareStrings(b.title, a.title);
      });
      setTitleOrder(0);
    }
  };

  // Sort table by TITLE SEARCH
  const titleSearchSort = (e) => {
    setDefaultDate("");
    setDefaultTitleSearch(e.target.value);
    let lowerSearch = e.target.value.toLowerCase();
    try {
      let result = expenseCopy.filter((a) => {
        let lowerExpenseTitle = a.title.toLowerCase();
        if (lowerExpenseTitle.includes(lowerSearch)) {
          return a;
        } else {
          return 0;
        }
      });
      setExpense(result);
    } catch (err) {
      console.log(err);
    }
  };

  // Sort table by AMOUNT
  const [amountOrder, setAmountOrder] = useState(0);
  const amountSort = () => {
    if (amountOrder === 0) {
      expense.sort(function (a, b) {
        return a.amount - b.amount;
      });
      setAmountOrder(1);
    } else {
      expense.sort(function (a, b) {
        return b.amount - a.amount;
      });
      setAmountOrder(0);
    }
  };

  // Sort table by EXPENSE TYPE
  const [expenseTypeOrder, setExpenseTypeOrder] = useState(0);
  const expenseTypeSort = () => {
    if (expenseTypeOrder === 0) {
      expense.sort(function (a, b) {
        return compareStrings(a.expense_type, b.expense_type);
      });
      setExpenseTypeOrder(1);
    } else {
      expense.sort(function (a, b) {
        return compareStrings(b.expense_type, a.expense_type);
      });
      setExpenseTypeOrder(0);
    }
  };

  // Sort table by DATE selected
  const dateSort = (e) => {
    setDefaultDate(e.target.value);
    setDefaultTitleSearch("");
    let dateSearch = e.target.value;
    // console.log(e.target.value);
    try {
      let result = expenseCopy.filter((a) => {
        let expenseDate = a.date;
        if (dateSearch === expenseDate) {
          return a;
        } else {
          return 0;
        }
      });

      if (dateSearch === "") {
        setExpense(expenseCopy);
      } else {
        setExpense(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Sort table by chronological date
  const [dateOrder, setDateOrder] = useState(1); // Set to 1 as default is already on order 0 (newest first)
  const defaultDateSort = (a, b) => {
    if (dateOrder === 0) {
      setDateOrder(1);
      expense.sort(function (a, b) {
        // Default sort by NEWEST DATE:
        var aa = a.date.split("/").reverse().join(),
          bb = b.date.split("/").reverse().join();
        return bb < aa ? -1 : bb > aa ? 1 : 0;
      });
    } else {
      setDateOrder(0);
      expense.sort(function (a, b) {
        // Default sort by OLDEST DATE:
        var aa = a.date.split("/").reverse().join(),
          bb = b.date.split("/").reverse().join();
        return bb > aa ? -1 : bb < aa ? 1 : 0;
      });
    }
  };


  // Set Date from yyyy-mm-dd to mm-dd-yyyy
  const formatDate = (dataDate) =>{
    var d = new Date(dataDate);
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString();
  }

  if (props.table === "full") {
    return (
      <Table striped bordered hover style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>
              #{/* <FaSort onClick={() => idSort()} className="tableSort" /> */}
            </th>
            <th className="tableTitle">
              Title{" "}
              <FaSort className="tableSort ms-1 mb-1" onClick={() => titleSort()} />
              <InputGroup style={{ width: "60%", display: "flex" }}>
                <Form.Control
                  aria-label="Title"
                  className="ms-2"
                  onChange={titleSearchSort}
                  value={defaultTitleSearch}
                />
              </InputGroup>
            </th>
            <th style={{width: '15%'}}>
              Amount <FaSort className="tableSort mb-1" onClick={() => amountSort()} />
            </th>
            <th style={{width: '20%'}}>
              Expense Type{" "}
              <FaSort className="tableSort mb-1" onClick={() => expenseTypeSort()} />
            </th>
            <th className="tableTitle">
              Date{" "}
              <FaSort
                className="tableSort ms-2 mb-1"
                onClick={() => defaultDateSort()}
              />
              <Form.Control
                style={{ display: "flex" }}
                type="date"
                className="tableSort ms-2"
                onChange={dateSort}
                value={defaultDate}
              />
            </th>
            <th style={{ borderRight: "none", width: '3%' }}></th>
            <th style={{ borderLeft: "none", width: '3%' }}></th>
          </tr>
        </thead>
        <tbody>
          {expense.map((dataObj, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{dataObj.title}</td>
                <td>{dataObj.amount}</td>
                <td>{dataObj.expense_type}</td>
                <td>{formatDate(dataObj.date)}</td>
                <td
                  className="tableEdit"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  onClick={() => {
                    props.income === 1 ? setIncomeModalShow(true) : setEditExpenseModalShow(true);
                    setModalData(dataObj);
                    setModalNum(index + 1);
                  }}
                >
                  <MdEdit />
                </td>

                <td
                  className="tableDelete"
                  style={{
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    border: "none",
                    borderRight: "solid 1px #DEE2E6",
                  }}
                  onClick={() => {
                    setDeleteExpenseModalShow(true);
                    setModalData(dataObj);
                    setModalNum(index + 1);
                  }}
                >
                  <MdDelete />
                </td>
              </tr>
            );
          })}
          <EditExpenseModal
            show={editExpenseModalShow}
            onHide={() => setEditExpenseModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            expensetype={modalData.expense_type}
            date={modalData.date}
          />
          <DeleteExpenseModal
            show={deleteExpenseModalShow}
            onHide={() => setDeleteExpenseModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            expensetype={modalData.expense_type}
            date={modalData.date}
          />
        </tbody>
      </Table>
    );
  } else if (props.table === "short") {
    return (
      <Table striped bordered hover style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>#</th>
            <th style={{ borderRight: "none" }}>{props.income === 1 ? "Income" : "Expense"}</th>
            {/* <th style={{ border: "none" }}></th> */}
            <th
              colSpan="2"
              className="tableView"
              style={{ borderLeft: "none", margin: "auto" }}
              onClick={() => {
                setExpenseAllTableModal(true);
                // setModalData(dataObj);
                // setModalNum(index + 1);
              }}
            >
              <GrView />
            </th>
          </tr>
        </thead>
        <tbody>
          {expense.slice(0, 10).map((dataObj, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {dataObj.title} (${dataObj.amount})
                </td>
                <td
                  className="tableEdit"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  onClick={() => {
                    props.income === 1 ? setIncomeModalShow(true) : setEditExpenseModalShow(true);
                    setModalData(dataObj);
                    setModalNum(index + 1);
                  }}
                >
                  <MdEdit />
                </td>

                <td
                  className="tableDelete"
                  style={{
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    border: "none",
                    borderRight: "solid 1px #DEE2E6",
                  }}
                  onClick={() => {
                    setDeleteExpenseModalShow(true);
                    setModalData(dataObj);
                    setModalNum(index + 1);
                  }}
                >
                  <MdDelete />
                </td>
              </tr>
            );
          })}
          <ExpensesTableModal
            show={expenseAllTableModal}
            onHide={() => setExpenseAllTableModal(false)}
            expense={props.expense}
            expensecopy={props.expenseCopy}
            income={props.income}
          />
          <IncomeModal 
            show={incomeModalShow}
            onHide={() => setIncomeModalShow(false)}
            id={modalData.id}
            title={modalData.title}
            amount={modalData.amount}
            payment_interval={modalData.payment_interval}
            start_date={modalData.start_date}
            occurring={modalData.occurring}
            end_date={modalData.end_date}
            edit_income={1}
          />
          <EditExpenseModal
            show={editExpenseModalShow}
            onHide={() => setEditExpenseModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            expensetype={modalData.expense_type}
            date={modalData.date}
          />
          <DeleteExpenseModal
            show={deleteExpenseModalShow}
            onHide={() => setDeleteExpenseModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            expensetype={modalData.expense_type}
            date={modalData.date}
            payment_interval={modalData.payment_interval}
            start_date={modalData.start_date}
            occurring={modalData.occurring}
            end_date={modalData.end_date}
          />
        </tbody>
      </Table>
    );
  }
}

export default ExpensesTable;
