import React, { useState, useEffect } from "react";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import PieChart from "../components/PieChart";
import HeatMap from "../components/HeatMap";
//import sql from "../db.js"
import ExpenseForm from "../components/ExpenseForm";
import { FaSort } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import InputGroup from "react-bootstrap/InputGroup";

import Table from "react-bootstrap/Table";

function FinanceManagement() {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [expense, setExpense] = useState([]);
  const [expenseCopy, setExpenseCopy] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalNum, setModalNum] = useState(0);
  const [defaultTitleSearch, setDefaultTitleSearch] = useState("");
  const [defaultDate, setDefaultDate] = useState("");
  let mortgage_rent = 0;
  let utilities = 0;
  let insurance = 0;
  let loans = 0;
  let transportation = 0;
  let food = 0;
  let other = 0;

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/expense`);
      const expenseJSON = await response.json();
      console.log("expense JSON:");
      console.log(expenseJSON);
      setExpense(
        expenseJSON.sort(function (a, b) {
          // return parseFloat(a.id) - parseFloat(b.id);    => sorted by ID # at first
          // Default sort by DATE:
          var aa = a.date.split("/").reverse().join(),
            bb = b.date.split("/").reverse().join();
          return bb < aa ? -1 : bb > aa ? 1 : 0;
        })
      );
      setExpenseCopy(
        expenseJSON.sort(function (a, b) {
          // return parseFloat(a.id) - parseFloat(b.id);    => sorted by ID # at first
          // Default sort by DATE:
          var aa = a.date.split("/").reverse().join(),
            bb = b.date.split("/").reverse().join();
          return bb < aa ? -1 : bb > aa ? 1 : 0;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

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

  // Sort table by DATE
  const dateSort = (e) => {
    setDefaultDate(e.target.value);
    setDefaultTitleSearch("");
    let dateSearch = e.target.value;
    console.log(e.target.value);
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


  useEffect(() => {
    getData();
  }, []);

  // MAP THROUGH DATA TO GRAB IT AND SET TOTAL AMOUNTS FOR PIE CHART.
  expense.map((dataObj) => {
    let formAmount = dataObj.amount;
    let formType = dataObj.expense_type;

    if (formType === "Mortgage/Rent") {
      return (mortgage_rent += formAmount);
    } else if (formType === "Utilities") {
      return (utilities += formAmount);
    } else if (formType === "Insurance") {
      return (insurance += formAmount);
    } else if (formType === "Loans") {
      return (loans += formAmount);
    } else if (formType === "Transportation") {
      return (transportation += formAmount);
    } else if (formType === "Food") {
      return (food += formAmount);
    } else if (formType === "Other") {
      return (other += formAmount);
    } else {
      return console.log("null form entry");
    }
  });

  return (
    <div id="financeManagement">
      <ExpenseForm postexpense={true} showsubmit={true} />

      <div className="chart">
        <PieChart
          series={[
            mortgage_rent,
            utilities,
            insurance,
            loans,
            transportation,
            food,
            other,
          ]}
        />
      </div>

      <Table striped bordered hover style={{ margin: "3.5rem auto" }}>
        <thead>
          <tr>
            <th>
              # 
              {/* <FaSort onClick={() => idSort()} className="tableSort" /> */}
            </th>
            <th className="tableTitle">
              Title{" "}
              <FaSort className="tableSort mb-1" onClick={() => titleSort()} />
              <InputGroup
                style={{ width: "60%", display: "flex" }}
              >
                <Form.Control
                  aria-label="Title"
                  onChange={titleSearchSort}
                  value={defaultTitleSearch}
                />
              </InputGroup>
            </th>
            <th>
              Amount{" "}
              <FaSort className="tableSort" onClick={() => amountSort()} />
            </th>
            <th>
              Expense Type{" "}
              <FaSort className="tableSort" onClick={() => expenseTypeSort()} />
            </th>
            <th className="tableTitle">
              Date{" "}
              <Form.Control
                style={{ width: "60%", display: "flex" }}
                type="date"
                className="tableSort ms-4"
                onChange={dateSort}
                value={defaultDate}
              />
            </th>
            <th></th>
            <th></th>
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
                <td>{dataObj.date}</td>
                <td
                  className="tableEdit"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  onClick={() => {
                    setEditModalShow(true);
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
                    setDeleteModalShow(true);
                    setModalData(dataObj);
                    setModalNum(index + 1);
                  }}
                >
                  X
                </td>
              </tr>
            );
          })}
          <EditModal
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            expensetype={modalData.expense_type}
            date={modalData.date}
          />
          <DeleteModal
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            expensetype={modalData.expense_type}
            date={modalData.date}
          />
        </tbody>
      </Table>
      <HeatMap 
      expense={expense}
      dailyAllowance={100}    // Change this to users daily allowance based on income/365
      />
    </div>
  );
}

export default FinanceManagement;
