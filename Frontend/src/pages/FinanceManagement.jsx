import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import HeatMap from "../components/HeatMap";

import InfoModal from "../components/InfoModal";

import SubmitExpenseModal from "../components/Expense/SubmitExpenseModal";
import ExpensesTable from "../components/Expense/ExpensesTable";

import LoanModal from "../components/Loan/LoanModal";
import LoanTable from "../components/Loan/LoanTable";

import ColumnChart from "../components/Income/ColumnChart";
import getLast5YearsIncome from "../components/Income/getLast5YearsIncome";
import IncomeModal from "../components/Income/IncomeModal";

import GoalModal from "../components/Goal/GoalModal";
import GoalsTable from "../components/Goal/GoalsTable";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/esm/Button";

import { useCookies } from "react-cookie";

import { CiCircleQuestion } from "react-icons/ci";

function FinanceManagement() {
  // Ignore unused variables on next line:
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [submitExpenseModalShow, setSubmitExpenseModalShow] = useState(false);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoP, setInfoP] = useState("");
  const [expense, setExpense] = useState([]);
  const [expenseCopy, setExpenseCopy] = useState([]);
  const [income, setIncome] = useState([]);
  const [incomeCopy, setIncomeCopy] = useState([]);

  // Date year for intro tabs
  let d = new Date();
  let thisYear = d.getFullYear();
  // let lastYear = d.getFullYear() - 1;

  // const getExpenseData = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/expense/${cookies.Email}`);
  //     const expenseJSON = await response.json();
  //     setExpense(
  //       expenseJSON.sort(function (a, b) {
  //         // Default sort by DATE:
  //         // var aa = a.date.split("/").reverse().join(),
  //         //   bb = b.date.split("/").reverse().join();
  //         // return bb < aa ? -1 : bb > aa ? 1 : 0;
  //         return parseFloat(b.id) - parseFloat(a.id);
  //       })
  //     );
  //     setExpenseCopy(
  //       expenseJSON.sort(function (a, b) {
  //         // Default sort by DATE:
  //         // var aa = a.date.split("/").reverse().join(),
  //         //   bb = b.date.split("/").reverse().join();
  //         // return bb < aa ? -1 : bb > aa ? 1 : 0;
  //         return parseFloat(b.id) - parseFloat(a.id);
  //       })
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Used for showing submit expense + add goal + add loan modals
  const showSubmitExpense = () => {
    setSubmitExpenseModalShow(true);
  };
  // Add GOAL modal
  const [addGoalModalShow, setAddGoalModalShow] = useState(false);
  const addGoal = () => {
    setAddGoalModalShow(true);
  };
    // Add INCOME modal
    const [addIncomeModalShow, setAddIncomeModalShow] = useState(false);
    const addIncome = () => {
      setAddIncomeModalShow(true);
    };
  // Add LOAN modal
  const [addLoanModalShow, setAddLoanModalShow] = useState(false);
  const addLoan = () => {
    setAddLoanModalShow(true);
  };



  const getDailyAllowance = () => {
    const leap = new Date(thisYear, 1, 29).getDate() === 29;
    let yearIncome = getLast5YearsIncome(income)[4];
    if (leap){
      return Math.floor((yearIncome/366 + Number.EPSILON) * 100) / 100
    } else return Math.floor((yearIncome/365 + Number.EPSILON) * 100) / 100
    
  }

  // Compare last years income to this years
  const incomeCompare = () => {
    let difference = getLast5YearsIncome(income)[4] - getLast5YearsIncome(income)[3];
    if (difference < 0){
      return <sup className="negative ms-1">${difference}</sup>
    } else return <sup className="positive ms-1">+${difference}</sup>
  }

  const yearExpenses = () => {
    let thisYearExpenseTotal = 0;
    let lastYearExpenseTotal = 0;
    expense.map((dataObj) => {
      // parseInt(dataObj.date) === thisYear ? expenseTotal += dataObj.amount : null;
      if (parseInt(dataObj.date) === thisYear){
        thisYearExpenseTotal += dataObj.amount
      } else if (parseInt(dataObj.date) === thisYear-1){
        lastYearExpenseTotal += dataObj.amount
      }
      return 0
    })

    let expenses = [lastYearExpenseTotal, thisYearExpenseTotal]
    return expenses;
  }

  const expenseCompare = () => {
    let difference = yearExpenses()[1] - yearExpenses()[0];
    if (difference > 0){
      return <sup className="negative ms-1">-${difference}</sup>
    } else return <sup className="positive ms-1">${difference}</sup>
  }

  const spentToday = () => {
    let today = new Date();
    let todayExpenses = 0;
    expense.map((dataObj) => {
      if (dataObj.date === today.toISOString().split('T')[0]){
        todayExpenses += dataObj.amount;
      }
      return 0;
    })

    return todayExpenses;
  }





  useEffect(() => {
    const getExpenseData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/expense/${cookies.Email}`
        );
        const expenseJSON = await response.json();
        setExpense(
          expenseJSON.sort(function (a, b) {
            // Default sort by DATE:
            // var aa = a.date.split("/").reverse().join(),
            //   bb = b.date.split("/").reverse().join();
            // return bb < aa ? -1 : bb > aa ? 1 : 0;
            return parseFloat(b.id) - parseFloat(a.id);
          })
        );
        setExpenseCopy(
          expenseJSON.sort(function (a, b) {
            // Default sort by DATE:
            // var aa = a.date.split("/").reverse().join(),
            //   bb = b.date.split("/").reverse().join();
            // return bb < aa ? -1 : bb > aa ? 1 : 0;
            return parseFloat(b.id) - parseFloat(a.id);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    const getIncomeData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/income/${cookies.Email}`
        );
        const incomeJSON = await response.json();
        setIncome(
          incomeJSON.sort(function (a, b) {
            // Default sort by DATE:
            // var aa = a.date.split("/").reverse().join(),
            //   bb = b.date.split("/").reverse().join();
            // return bb < aa ? -1 : bb > aa ? 1 : 0;
            return parseFloat(b.id) - parseFloat(a.id);
          })
        );
        setIncomeCopy(
          incomeJSON.sort(function (a, b) {
            // Default sort by DATE:
            // var aa = a.date.split("/").reverse().join(),
            //   bb = b.date.split("/").reverse().join();
            // return bb < aa ? -1 : bb > aa ? 1 : 0;
            return parseFloat(b.id) - parseFloat(a.id);
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    getExpenseData();
    getIncomeData();
  }, [cookies.Email]);





  return (
    <div id="clientPage">
      <div id="sideNav" className="">
        <SideNav />
      </div>
      <div id="financeManagement" className="">
        <div className="FMIntro mb-5">
          <div
            className="FMIntroBox"
            style={{ borderLeft: "solid 3px #008FFB" }}
          >
            <p className="FMIntroBoxTitle" style={{ color: "#008FFB" }}>
              Daily Allowance:
            </p>
            <p className="center" style={{fontSize: "1.1rem"}}>${getDailyAllowance()}</p>
          </div>
          <div
            className="FMIntroBox"
            style={{ borderLeft: "solid 3px #00E396" }}
          >
            <p className="FMIntroBoxTitle" style={{ color: "#00E396" }}>
              {thisYear} Net Income:
            </p>
            {/* ADD A +/- FROM LAST YEAR */}
            <p className="center" style={{fontSize: "1.1rem"}}>${getLast5YearsIncome(income)[4]}{incomeCompare()}</p>
          </div>
          <div
            className="FMIntroBox"
            style={{ borderLeft: "solid 3px #FFB01A" }}
          >
            <p className="FMIntroBoxTitle" style={{ color: "#FFB01A" }}>
              {thisYear} Expense Total:
            </p>
            <p className="center" style={{fontSize: "1.1rem"}}>${yearExpenses()[1]}{expenseCompare()}</p>
          </div>
          <div
            className="FMIntroBox"
            style={{ borderLeft: "solid 3px #D60027" }}
          >
            <p className="FMIntroBoxTitle" style={{ color: "#D60027" }}>
              Spent Today:
            </p>
            <p className="center" style={{fontSize: "1.1rem"}}>${spentToday()}</p>
          </div>
        </div>

        {/* TABS*/}
        <Tabs
          defaultActiveKey="expense"
          id="uncontrolled-tab-example"
          className=""
          // variant="pills"
          // justify
        >
          <Tab eventKey="expense" title="Expenses">
            <div className="tabIntroInfo">
              <h2 className="ms-4">
                Expense Sectors
                <CiCircleQuestion
                  className="infoButton"
                  onClick={() => {
                    setInfoModalShow(true);
                    setInfoTitle("Expenses Pie Chart");
                    setInfoP(
                      "The Expense Sectors Pie Chart shows all expense categories recorded. All percentages take all expenses into account to calculate how much was spent in each sector across the account's lifespan."
                    );
                  }}
                />
              </h2>
              <InfoModal
                title={infoTitle}
                description={infoP}
                show={infoModalShow}
                onHide={() => setInfoModalShow(false)}
              />

              <Button
                variant="primary"
                size="lg"
                className="me-4"
                onClick={showSubmitExpense}
              >
                Add Expense
              </Button>
              <SubmitExpenseModal
                show={submitExpenseModalShow}
                onHide={() => setSubmitExpenseModalShow(false)}
              />
            </div>

            {/* Expenses pie chart */}
            <div className="expenseTab center">
              <div className="pieChart">
                <PieChart expense={expense} />
              </div>

              {/* Expenses table */}
              <div className="expenseTable">
                <ExpensesTable
                  expense={expense}
                  expenseCopy={expenseCopy}
                  table={"short"}
                />
              </div>
            </div>
          </Tab>

          <Tab eventKey="goal" title="Goals">
            {/* Goals table */}
            <div className="tabIntroInfo pb-4">
              <h2 className="ms-5">Goal Tracker</h2>
              <Button
                className="me-5"
                variant="primary"
                size="lg"
                onClick={addGoal}
              >
                Add Goal
              </Button>
              <GoalModal
                show={addGoalModalShow}
                postgoal={1}
                onHide={() => setAddGoalModalShow(false)}
              />
            </div>
            <div className="goalTab">
              <GoalsTable />
            </div>
          </Tab>

          <Tab eventKey="income" title="Income">
            {/* Income tracker table */}
            <div className="tabIntroInfo pb-4">
              <h2 className="ms-5">Income Tracker</h2>
              <Button
                className="me-5"
                variant="primary"
                size="lg"
                onClick={addIncome}
              >
                Add Income
              </Button>
              <IncomeModal
                show={addIncomeModalShow}
                postincome={1}
                showsubmit={1}
                onHide={() => setAddIncomeModalShow(false)}
              />
            </div>
            <div className="incomeTab center">
              <div className="columnChart">
                <ColumnChart income={income}/>
              </div>
              <div className="incomeTable">
                <ExpensesTable
                  expense={income}
                  expenseCopy={incomeCopy}
                  income={1}
                  table={"short"}
                />
              </div>
            </div>
          </Tab>

          <Tab eventKey="loan" title="Loans">
            {/* Loan tracker table */}
            <div className="tabIntroInfo pb-4">
              <h2 className="ms-5">Loan Tracker</h2>
              <Button
                className="me-5"
                variant="primary"
                size="lg"
                onClick={addLoan}
              >
                Add Loan
              </Button>
              <LoanModal
                show={addLoanModalShow}
                postloan={1}
                onHide={() => setAddLoanModalShow(false)}
              />
            </div>
            <div>
              <LoanTable />
            </div>

            {/* ////////////////////////////////////////////////////////////////////////// */}
            {/* ////////////////////////////////////////////////////////////////////////// */}
            {/* ////////////////////////////////////////////////////////////////////////// */}
            {/* Expenses table */}
            {/* ////////////////////////////////////////////////////////////////////////// */}
            {/* ////////////////////////////////////////////////////////////////////////// */}
            {/* ////////////////////////////////////////////////////////////////////////// */}
            {/* <div className="pieChart">
                <LoanProjectionTable dataView={"graph"}/>
              </div> */}
            {/* </div> */}
          </Tab>
        </Tabs>

        {/* Expenses bar chart */}
        <div className="mt-5">
          <BarChart expense={expense} />
        </div>

        {/* Daily spending heatmap */}
        <div className="mt-5">
          <HeatMap
            expense={expense}
            dailyAllowance={getDailyAllowance()} // Change this to users daily allowance based on income/365
          />
        </div>
      </div>
    </div>
  );
}

export default FinanceManagement;
