const PORT = process.env.PORT ?? 8000;
const express = require("express");
//const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

app.use(cors());
app.use(express.json());

/**************************************/
/**************************************/
/**************EXPENSES****************/
/**************************************/
/**************************************/

// Get all user expenses data
app.get("/expense", async (req, res) => {
  try {
    const expense = await pool.query("SELECT * FROM expense");
    res.json(expense.rows);
  } catch (err) {
    console.log(err);
    // console.error(error);
  }
});

// Post new expense to database
app.post("/expense", (req, res) => {
  const { title, amount, expense_type, date } = req.body;
  console.log(
    `info from req. body: ${title}, ${amount}, ${expense_type}, ${date}`
  );
  //const id = uuidv4();
  try {
    pool.query(
      "INSERT INTO expense(title, amount, expense_type, date) VALUES($1, $2, $3, $4)",
      [title, amount, expense_type, date]
    );
  } catch (err) {
    console.log(err);
  }
});

// Edit a users expense in database
app.put("/expense", async (req, res) => {
  // const { id } = req.params;
  const { id, title, amount, expense_type, date } = req.body;
  try {
    const editExpense = await pool.query(
      "UPDATE expense SET title = $2, amount = $3, expense_type = $4, date = $5 WHERE id = $1",
      [id, title, amount, expense_type, date]
    );
    res.json(editExpense);
  } catch (err) {
    console.log(err);
  }
});

// DELETE a users expense in database
app.delete("/expense", async (req, res) => {
  const { id } = req.body;
  try {
    const deleteExpense = await pool.query(
      "DELETE FROM expense WHERE id = $1",
      [id]
    );
    res.json(deleteExpense);
  } catch (err) {
    console.log(err);
  }
});

/**************************************/
/**************************************/
/****************GOALS*****************/
/**************************************/
/**************************************/

// Get all user goals data
app.get("/goal", async (req, res) => {
  try {
    const goal = await pool.query("SELECT * FROM goal");
    res.json(goal.rows);
  } catch (err) {
    console.log(err);
  }
});

// Post new goal to database
app.post("/goal", (req, res) => {
  const { title, amount, start_date, goal_date, completed } = req.body;
  console.log(
    `info from req. body: ${title}, ${amount}, ${start_date}, ${goal_date}, ${completed}`
  );
  try {
    pool.query(
      "INSERT INTO goal(title, amount, start_date, goal_date, completed) VALUES($1, $2, $3, $4, $5)",
      [title, amount, start_date, goal_date, completed]
    );
  } catch (err) {
    console.log(err);
  }
});


// Edit a users goal in database
// app.put("/goal", async (req, res) => {
//   const { id, title, amount, start_date, goal_date } = req.body;
//   try {
//     const editExpense = await pool.query(
//       "UPDATE user_goal SET title = $2, amount = $3, start_date = $4, goal_date = $5 WHERE id = $1",
//       [id, title, amount, start_date, goal_date]
//     );
//     res.json(editExpense);
//   } catch (err) {
//     console.log(err);
//   }
// });
// Edited from above to not change start date when edited
app.put("/goal", async (req, res) => {
  const { id, title, amount, goal_date, completed } = req.body;
  try {
    const editGoal = await pool.query(
      "UPDATE goal SET title = $2, amount = $3, goal_date = $4, completed = $5 WHERE id = $1",
      [id, title, amount, goal_date, completed]
    );
    res.json(editGoal);
  } catch (err) {
    console.log(err);
  }
});

// DELETE a users goal in database
app.delete("/goal", async (req, res) => {
  const { id } = req.body;
  try {
    const deleteGoal = await pool.query(
      "DELETE FROM goal WHERE id = $1",
      [id]
    );
    res.json(deleteGoal);
  } catch (err) {
    console.log(err);
  }
});


/**************************************/
/**************************************/
/****************LOANS*****************/
/**************************************/
/**************************************/

// Get all user loans data
app.get("/loan", async (req, res) => {
  try {
    const loan = await pool.query("SELECT * FROM loan");
    res.json(loan.rows);
  } catch (err) {
    console.log(err);
  }
});

// Post new loan to database
app.post("/loan", (req, res) => {
  const { title, amount, interest, start_date, term, balance_left, interest_type } = req.body;
  console.log(
    `info from req. body: ${title}, ${amount}, ${interest}, ${start_date}, ${term}, ${balance_left}, ${interest_type}`
  );
  try {
    pool.query(
      "INSERT INTO loan(title, amount, interest, start_date, term, balance_left, interest_type) VALUES($1, $2, $3, $4, $5, $6, $7)",
      [title, amount, interest, start_date, term, balance_left, interest_type]
    );
  } catch (err) {
    console.log(err);
  }
});


// Edit a users loan in database
app.put("/loan", async (req, res) => {
  const { id, title, amount, interest, start_date, term, balance_left, interest_type } = req.body;
  try {
    const editLoan = await pool.query(
      "UPDATE loan SET title = $2, amount = $3, interest = $4, start_date = $5, term = $6, balance_left = $7, interest_type = $8 WHERE id = $1",
      [id, title, amount, interest, start_date, term, balance_left, interest_type]
    );
    res.json(editLoan);
  } catch (err) {
    console.log(err);
  }
});

// DELETE a users loan in database
app.delete("/loan", async (req, res) => {
  const { id } = req.body;
  try {
    const deleteLoan = await pool.query(
      "DELETE FROM loan WHERE id = $1",
      [id]
    );
    res.json(deleteLoan);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
