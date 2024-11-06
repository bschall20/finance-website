import React, { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import HeatMap from "../components/HeatMap";

import InfoModal from "../components/InfoModal";

import SubmitExpenseModal from "../components/Expense/SubmitExpenseModal";
import ExpensesTable from "../components/Expense/ExpensesTable";

import ColumnChart from "../components/Income/ColumnChart";

import LoanModal from "../components/Loan/LoanModal";
import LoanTable from "../components/Loan/LoanTable";

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
  let dailyAllowance = 100;

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
  // Add goal modal
  const [addGoalModalShow, setAddGoalModalShow] = useState(false);
  const addGoal = () => {
    setAddGoalModalShow(true);
  };
  // Add loan modal
  const [addLoanModalShow, setAddLoanModalShow] = useState(false);
  const addLoan = () => {
    setAddLoanModalShow(true);
  };

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
    getExpenseData();
  }, [cookies.Email]);

  // const isLogIn = false

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
            <p>${dailyAllowance}</p>
          </div>
          <div
            className="FMIntroBox"
            style={{ borderLeft: "solid 3px #00E396" }}
          >
            <p className="FMIntroBoxTitle" style={{ color: "#00E396" }}>
              {thisYear} Net Income:
            </p>
            ADD A +/- FROM LAST YEAR
            <p>{dailyAllowance}</p>
          </div>
          <div
            className="FMIntroBox"
            style={{ borderLeft: "solid 3px #FFB01A" }}
          >
            <p className="FMIntroBoxTitle" style={{ color: "#FFB01A" }}>
              Goals Completed This Year:
            </p>
            <p>{dailyAllowance}</p>
          </div>
          <div
            className="FMIntroBox"
            style={{ borderLeft: "solid 3px #D60027" }}
          >
            <p className="FMIntroBoxTitle" style={{ color: "#D60027" }}>
              Open Loans:
            </p>
            <p>{dailyAllowance}</p>
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
                onClick={addLoan}
              >
                Add Income
              </Button>
              <LoanModal
                show={addLoanModalShow}
                postloan={1}
                onHide={() => setAddLoanModalShow(false)}
              />
            </div>
            <div className="incomeTab center">
              <div className="columnChart">
                <ColumnChart />
              </div>
              <div className="incomeTable">
                <ExpensesTable
                  expense={expense}
                  expenseCopy={expenseCopy}
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
            dailyAllowance={dailyAllowance} // Change this to users daily allowance based on income/365
          />
        </div>
      </div>
    </div>
  );
}

export default FinanceManagement;
