import React, { useState, useEffect } from "react";
import SubmitExpenseModal from "../components/SubmitExpenseModal";
import PieChart from "../components/PieChart";
// import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import ExpensesTable from "../components/ExpensesTable";
import HeatMap from "../components/HeatMap";
import GoalModal from "../components/GoalModal";
import Button from "react-bootstrap/esm/Button";
import GoalsTable from "../components/GoalsTable";
import { CiCircleQuestion } from "react-icons/ci";
import InfoModal from "../components/InfoModal";

function FinanceManagement() {
  const [submitExpenseModalShow, setSubmitExpenseModalShow] = useState(false);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoP, setInfoP] = useState("");
  const [expense, setExpense] = useState([]);
  const [expenseCopy, setExpenseCopy] = useState([]);
  const [goal, setGoal] = useState([]);
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
      {/* Expenses pie chart */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      <div className="pieChart">
        <h2>
          Expense Sectors
          <CiCircleQuestion
            className="infoButton"
            onClick={() => {
              setInfoModalShow(true);
              setInfoTitle("Expenses Pie Chart");
              setInfoP("The Expense Sectors Pie Chart shows all expense categories recorded. All percentages take all expenses into account to calculate how much was spent in each sector across the account's lifespan.")
            }}
          />
        </h2>
        <InfoModal
          title={infoTitle}
          description={infoP}
          show={infoModalShow}
          onHide={() => setInfoModalShow(false)}
        />
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

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Expenses line graph */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}

      {/* <div>
        <LineChart expense={expense} />
      </div> */}

      <div>
        <h2>
          Expense Bar Chart{" "}
          <CiCircleQuestion
            className="infoButton"
            onClick={() => {
              setInfoModalShow(true);
              setInfoTitle("Expenses Bar Chart");
              setInfoP("The Expenses Bar Chart Chart shows all expense categories recorded. When the timeframe is selected, it will display the categories per the time selected. For example, 'Days' will show every day of the week and the spending trends per that day of the week. 'Monday' will list all Monday expenses logged through the account's entire lifespan.")
            }}
          />
        </h2>
        <InfoModal
          title={infoTitle}
          description={infoP}
          show={infoModalShow}
          onHide={() => setInfoModalShow(false)}
        />
        <BarChart expense={expense} />
      </div>

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Expenses table */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      <h2>Expenses</h2>
      <ExpensesTable expense={expense} expenseCopy={expenseCopy} />

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

      <GoalsTable goal={goal} />
    </div>
  );
}

export default FinanceManagement;
