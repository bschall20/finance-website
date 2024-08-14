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
    const expense = await pool.query("SELECT * FROM user_expense");
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
      "INSERT INTO user_expense(title, amount, expense_type, date) VALUES($1, $2, $3, $4)",
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
      "UPDATE user_expense SET title = $2, amount = $3, expense_type = $4, date = $5 WHERE id = $1",
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
      "DELETE FROM user_expense WHERE id = $1",
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
    const expense = await pool.query("SELECT * FROM user_goal");
    res.json(expense.rows);
  } catch (err) {
    console.log(err);
  }
});

// Post new goal to database
app.post("/goal", (req, res) => {
  const { title, amount, start_date, goal_date } = req.body;
  console.log(
    `info from req. body: ${title}, ${amount}, ${start_date}, ${goal_date}`
  );
  try {
    pool.query(
      "INSERT INTO user_goal(title, amount, start_date, goal_date) VALUES($1, $2, $3, $4)",
      [title, amount, start_date, goal_date]
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
  const { id, title, amount, goal_date } = req.body;
  try {
    const editExpense = await pool.query(
      "UPDATE user_goal SET title = $2, amount = $3, goal_date = $4 WHERE id = $1",
      [id, title, amount, goal_date]
    );
    res.json(editExpense);
  } catch (err) {
    console.log(err);
  }
});

// DELETE a users goal in database
app.delete("/goal", async (req, res) => {
  const { id } = req.body;
  try {
    const deleteExpense = await pool.query(
      "DELETE FROM user_goal WHERE id = $1",
      [id]
    );
    res.json(deleteExpense);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
