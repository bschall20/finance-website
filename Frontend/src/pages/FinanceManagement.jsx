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
import LoanModal from "../components/LoanModal";
import LoanTracker from "../components/LoanTracker";
import { CiCircleQuestion } from "react-icons/ci";
import InfoModal from "../components/InfoModal";

function FinanceManagement() {
  const [submitExpenseModalShow, setSubmitExpenseModalShow] = useState(false);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoP, setInfoP] = useState("");
  const [expense, setExpense] = useState([]);
  const [expenseCopy, setExpenseCopy] = useState([]);
  let dailyAllowance = 100;

  const getExpenseData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/expense`);
      const expenseJSON = await response.json();
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
    getExpenseData();
  }, []);


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
        <PieChart expense={expense} />
      </div>

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Expenses bar chart */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}

      <div>
        <h2>
          Expense Bar Chart{" "}
          <CiCircleQuestion
            className="infoButton"
            onClick={() => {
              setInfoModalShow(true);
              setInfoTitle("Expenses Bar Chart");
              setInfoP(
                "The Expenses Bar Chart Chart shows all expense categories recorded. When the timeframe is selected, it will display the categories per the time selected. For example, 'Days' will show every day of the week and the spending trends per that day of the week. 'Monday' will list all Monday expenses logged through the account's entire lifespan."
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
      {/* Daily spending heatmap */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      <h2>Loan Tracker</h2>
      <Button variant="primary" size="lg" onClick={addLoan}>
        +
      </Button>
      <LoanModal
        show={addLoanModalShow}
        postloan={1}
        onHide={() => setAddLoanModalShow(false)}
      />
      <LoanTracker />

      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* Goals table */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////// */}
      <h2>Add Goal</h2>
      <Button variant="primary" size="lg" onClick={addGoal}>
        +
      </Button>
      <GoalModal
        show={addGoalModalShow}
        postgoal={1}
        onHide={() => setAddGoalModalShow(false)}
      />

      <GoalsTable />
    </div>
  );
}

export default FinanceManagement;
