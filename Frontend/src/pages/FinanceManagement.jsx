import React, { useState, useEffect } from "react";
// import ExpenseForm from "../components/ExpenseForm";
import SubmitExpenseModal from "../components/SubmitExpenseModal";
import EditExpenseModal from "../components/EditExpenseModal";
import DeleteExpenseModal from "../components/DeleteExpenseModal";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import HeatMap from "../components/HeatMap";
// import SetGoal from "../components/SetGoal";       ====> can delete if all works with goal table. was redundant component
import GoalModal from "../components/GoalModal";
import DeleteGoalModal from "../components/DeleteGoalModal";

import { FaSort } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";

function FinanceManagement() {
  const [submitExpenseModalShow, setSubmitExpenseModalShow] = useState(false);
  const [editExpenseModalShow, setEditExpenseModalShow] = useState(false);
  const [deleteExpenseModalShow, setDeleteExpenseModalShow] = useState(false);
  const [goalModalShow, setGoalModalShow] = useState(false);
  const [expense, setExpense] = useState([]);
  const [expenseCopy, setExpenseCopy] = useState([]);
  const [goal, setGoal] = useState([]);
  const [deleteGoalModalShow, setDeleteGoalModalShow] = useState(false);
  // const [deleteExpense, setDeleteExpense] = useState(0);
  // const [goalCopy, setGoalCopy] = useState([]);
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
  let dailyAllowance = 100;

  const getExpenseData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/expense`);
      const expenseJSON = await response.json();
      // console.log("expense JSON:");
      // console.log(expenseJSON);
      setExpense(
        expenseJSON.sort(function (a, b) {
          // Default sort by DATE:
          var aa = a.date.split("/").reverse().join(),
            bb = b.date.split("/").reverse().join();
          return bb < aa ? -1 : bb > aa ? 1 : 0;
        })
      );
      setExpenseCopy(
        expenseJSON.sort(function (a, b) {
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

  const getGoalData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/goal`);
      const goalJSON = await response.json();
      // console.log("goal JSON:");
      // console.log(goalJSON);
      setGoal(
        goalJSON.sort(function (a, b) {
          // Default sort by DATE:
          var aa = a.goal_date.split("/").reverse().join(),
            bb = b.goal_date.split("/").reverse().join();
          return aa < bb ? -1 : aa > bb ? 1 : 0;
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

  // Days Between Goal Dates
  function daysLeft(goal_date, bool, start_date, amount) {

    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var today = `${year}/${month}/${day}`;
    var todayDate = Date.parse(today);
    var goalDate = Date.parse(goal_date);
    var diff = new Date(goalDate - todayDate);
    var days = Math.ceil(diff / 1000 / 60 / 60 / 24);
    var daysString = days.toString();


    // Variables for returning goal amount to save/day
    var startDate = Date.parse(start_date);
    var amountDiff = new Date(goalDate - startDate);
    var amountDays = Math.ceil(amountDiff / 1000 / 60 / 60 / 24);
    // var amountDaysString = amountDays.toString();
    var amountLeft = Math.round((amount/amountDays) * 100)/100;

    // Return days left on goal for delete goal modal 
    if (bool === true) {
      return `${days}`;
    } 
    // Return negative days for being late
    else if (Array.from(daysString)[0] === "-") {
      return `${days} (late)`;
    }
    // Using function to return amount to save per day from start date
    else if (bool === 2){
      return (amountLeft)
    } 
  }

  // Used for showing submit expense + add goal modals
  const showSubmitExpense = () => {
    setSubmitExpenseModalShow(true);
  };
  const [addGoalModalShow, setAddGoalModalShow] = useState(false);
  const addGoal = () => {
    setAddGoalModalShow(true);
  };

  useEffect(() => {
    getExpenseData();
    getGoalData();
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
      <h2>Add Expense</h2>
      <Button
        variant="primary"
        size="lg"
        style={{}}
        onClick={showSubmitExpense}
      >
        +
      </Button>
      <SubmitExpenseModal
        show={submitExpenseModalShow}
        onHide={() => setSubmitExpenseModalShow(false)}
      />
      {/* <ExpenseForm postexpense={true} showsubmit={true} /> */}

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Expenses piechart */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
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

        <LineChart
          expense={expense}
        />
      </div>

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Expenses table */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      <h2>Expenses</h2>
      <Table striped bordered hover style={{ margin: "0rem auto 3.5rem" }}>
        <thead>
          <tr>
            <th>
              #{/* <FaSort onClick={() => idSort()} className="tableSort" /> */}
            </th>
            <th className="tableTitle">
              Title{" "}
              <FaSort className="tableSort mb-1" onClick={() => titleSort()} />
              <InputGroup style={{ width: "60%", display: "flex" }}>
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
                    setEditExpenseModalShow(true);
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
                    setDeleteExpenseModalShow(true);
                    setModalData(dataObj);
                    setModalNum(index + 1);
                  }}
                >
                  X
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

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Daily spending heatmap */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      <HeatMap
        expense={expense}
        dailyAllowance={dailyAllowance} // Change this to users daily allowance based on income/365
      />

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Goals table */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* <SetGoal dailyAllowance={dailyAllowance} /> */}
      <h2>Add Goal</h2>
      <Button variant="primary" size="lg" style={{}} onClick={addGoal}>
        +
      </Button>
      <GoalModal
        show={addGoalModalShow}
        showsubmit={1}
        postgoal={1}
        onHide={() => setAddGoalModalShow(false)}
      />

      <Table striped bordered hover style={{ margin: "0rem auto 3.5rem" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Goal Title</th>
            <th>Goal Amount </th>
            <th>Goal Start</th>
            <th>Goal End</th>
            <th>Save per Day (from Start)</th>
            <th>Days Left</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {goal.map((dataObj, index) => {
            // Need to go through this later to remove redundancy.
            let tableIndex;
            let tableTitle;
            let tableAmount;
            let tableStart;
            let tableDate;
            let tableSave;
            let tableLeft;
            // Return Overdue Goal
            if (daysLeft(dataObj.goal_date, true)[0] === "-") {
              tableIndex = (
                <td style={{ backgroundColor: "#D60027" }}>{index + 1}</td>
              );
              tableTitle = (
                <td style={{ backgroundColor: "#D60027" }}>{dataObj.title}</td>
              );
              tableAmount = (
                <td style={{ backgroundColor: "#D60027" }}>{dataObj.amount}</td>
              );
              tableStart = (<td style={{backgroundColor: "#D60027"}}>{dataObj.start_date}</td>)
              tableDate = (
                <td style={{ backgroundColor: "#D60027" }}>
                  {dataObj.goal_date}
                </td>
              );
              tableSave = (
                <td style={{ backgroundColor: "#D60027" }}>${daysLeft(dataObj.goal_date, 2, dataObj.start_date, dataObj.amount)}</td>
              );
              tableLeft = (
                <td style={{ backgroundColor: "#D60027" }}>
                  {daysLeft(dataObj.goal_date, true)}
                </td>
              );
            } 
            // Return Goal with Days Left
            else {
              tableIndex = <td>{index + 1}</td>;
              tableTitle = <td>{dataObj.title}</td>;
              tableAmount = <td>{dataObj.amount}</td>;
              tableStart = <td>{dataObj.start_date}</td>
              tableDate = <td>{dataObj.goal_date}</td>;
              tableSave = <td>${daysLeft(dataObj.goal_date, 2, dataObj.start_date, dataObj.amount)}</td>;
              tableLeft = <td>{daysLeft(dataObj.goal_date, true)}</td>;
            }

            return (
              <tr key={index}>
                {tableIndex}
                {tableTitle}
                {tableAmount}
                {tableStart}
                {tableDate}
                {tableSave}
                {tableLeft}
                {/* <td>{index + 1}</td>
                <td>{dataObj.title}</td>
                <td>{dataObj.amount}</td>
                <td>{dataObj.start_date}</td>
                <td>{dataObj.goal_date}</td>
                {daysLeft(dataObj.goal_date, false)} */}

                <td
                  className="tableEdit"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  onClick={() => {
                    setGoalModalShow(true);
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
                    setDeleteGoalModalShow(true);
                    setModalData(dataObj);
                    setModalNum(index + 1);
                  }}
                >
                  X
                </td>
              </tr>
            );
          })}
          <GoalModal
            show={goalModalShow}
            showsubmit={0}
            onHide={() => setGoalModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            startdate={modalData.start_date}
            goaldate={modalData.goal_date}
            editgoal={1}
          />
          <DeleteGoalModal
            show={deleteGoalModalShow}
            onHide={() => setDeleteGoalModalShow(false)}
            id={modalData.id}
            num={modalNum}
            title={modalData.title}
            amount={modalData.amount}
            startdate={modalData.start_date}
            goaldate={modalData.goal_date}
            // daysleft={daysLeft(modalData.start_date, modalData.goal_date).toString()}
            daysleft={daysLeft(modalData.goal_date, true).toString()}
          />
        </tbody>
      </Table>
    </div>
  );
}

export default FinanceManagement;
