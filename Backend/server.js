const PORT = process.env.PORT ?? 8000;
const express = require("express");
//const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

app.use(cors());
app.use(express.json());

/**************************************/
/**************************************/
/***************PERSON*****************/
/**************************************/
/**************************************/

// Get all person data
app.get("/person/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const person = await pool.query("SELECT * FROM person WHERE email = $1", [email]);
    res.json(person.rows);
  } catch (err) {
    console.log(err);
  }
});

// Sign Up
app.post("/person", async (req, res) => {
  const { email, password, first_name, last_name, phone_number, address, city, state, postal_code } = req.body;

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt)
  console.log(
    `info from req. body: ${email}, ${password}, ${first_name}, ${last_name}, ${phone_number}, ${address}, ${city}, ${state}, ${postal_code} `
  );
  try {
    const signUp = await pool.query(
      "INSERT INTO person(email, passwordhash, first_name, last_name, phone_number, address, city, state, postal_code) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [email, hashedPassword, first_name, last_name, phone_number, address, city, state, postal_code]
    );

    // Prevents same email signup
    const token = jwt.sign({ email }, 'secret', { expiresIn: "1hr"})
    res.json({ email, token })

  } catch (err) {
    console.log(err);
    if (err) {
      res.json({ detail: err.detail })
    }
  }
});

// Edit a person in database
app.put("/person/:email", async (req, res) => {
  const { email } = req.params;
  const { first_name, last_name, phone_number, address, city, state, postal_code } = req.body;
  try {
    const editPerson = await pool.query(
      "UPDATE person SET first_name = $2, last_name = $3, phone_number = $4, address = $5, city = $6, state = $7, postal_code = $8 WHERE email = $1",
      [email, first_name, last_name, phone_number, address, city, state, postal_code]
    );
    res.json(editPerson);
  } catch (err) {
    console.log(err);
  }
});


// Sign In
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const person = await pool.query("SELECT * FROM person WHERE email = $1", [email]);

      if (!person.rows.length){
        return res.json({ detail : "User does not exist."})
      }

      const success = await bcrypt.compare(password, person.rows[0].passwordhash);
      const token = jwt.sign({ email }, 'secret', { expiresIn: "1hr"})
      if (success) {
        res.json({ "email" : person.rows[0].email, token})
      } else {
        res.json({ detail : "Login failed."})
      }


  } catch (err) {
    console.log(err);
  }
});





/**************************************/
/**************************************/
/**************EXPENSES****************/
/**************************************/
/**************************************/

// Get all user expenses data
app.get("/expense/:person_email", async (req, res) => {
  const { person_email } = req.params;
  try {
    const expense = await pool.query("SELECT * FROM expense WHERE person_email = $1", [person_email]);
    res.json(expense.rows);
  } catch (err) {
    console.log(err);
    // console.error(error);
  }
});

// Post new expense to database
app.post("/expense", (req, res) => {
  const { title, amount, expense_type, date, person_email } = req.body;
  console.log(
    `info from req. body: ${title}, ${amount}, ${expense_type}, ${date}, ${person_email}`
  );
  //const id = uuidv4();
  try {
    pool.query(
      "INSERT INTO expense(title, amount, expense_type, date, person_email) VALUES($1, $2, $3, $4, $5)",
      [title, amount, expense_type, date, person_email]
    );
  } catch (err) {
    console.log(err);
  }
});

// Edit a users expense in database
app.put("/expense", async (req, res) => {
  // const { id } = req.params;
  const { id, title, amount, expense_type, date, person_email } = req.body;
  try {
    const editExpense = await pool.query(
      "UPDATE expense SET title = $2, amount = $3, expense_type = $4, date = $5, person_email = $6  WHERE id = $1",
      [id, title, amount, expense_type, date, person_email]
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
app.get("/goal/:person_email", async (req, res) => {
  const { person_email } = req.params;
  try {
    const goal = await pool.query("SELECT * FROM goal WHERE person_email = $1", [person_email]);
    res.json(goal.rows);
  } catch (err) {
    console.log(err);
  }
});

// Post new goal to database
app.post("/goal", (req, res) => {
  const { title, amount, start_date, goal_date, completed, person_email } = req.body;
  console.log(
    `info from req. body: ${title}, ${amount}, ${start_date}, ${goal_date}, ${completed}, ${person_email}`
  );
  try {
    pool.query(
      "INSERT INTO goal(title, amount, start_date, goal_date, completed, person_email) VALUES($1, $2, $3, $4, $5, $6)",
      [title, amount, start_date, goal_date, completed, person_email]
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
  const { id, title, amount, goal_date, completed, person_email } = req.body;
  try {
    const editGoal = await pool.query(
      "UPDATE goal SET title = $2, amount = $3, goal_date = $4, completed = $5, person_email = $6 WHERE id = $1",
      [id, title, amount, goal_date, completed, person_email]
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
    const deleteGoal = await pool.query("DELETE FROM goal WHERE id = $1", [id]);
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
app.get("/loan/:person_email", async (req, res) => {
  const { person_email } = req.params;
  try {
    const loan = await pool.query("SELECT * FROM loan WHERE person_email = $1", [person_email]);
    res.json(loan.rows);
  } catch (err) {
    console.log(err);
  }
});

// Post new loan to database
app.post("/loan", (req, res) => {
  const {
    title,
    amount,
    interest,
    start_date,
    term,
    balance_left,
    interest_type,
    person_email,
  } = req.body;
  console.log(
    `info from req. body: ${title}, ${amount}, ${interest}, ${start_date}, ${term}, ${balance_left}, ${interest_type}, ${person_email}`
  );
  try {
    pool.query(
      "INSERT INTO loan(title, amount, interest, start_date, term, balance_left, interest_type, person_email) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      [title, amount, interest, start_date, term, balance_left, interest_type, person_email]
    );
  } catch (err) {
    console.log(err);
  }
});

// Edit a users loan in database
app.put("/loan", async (req, res) => {
  const {
    id,
    title,
    amount,
    interest,
    start_date,
    term,
    balance_left,
    interest_type,
    person_email,
  } = req.body;
  try {
    const editLoan = await pool.query(
      "UPDATE loan SET title = $2, amount = $3, interest = $4, start_date = $5, term = $6, balance_left = $7, interest_type = $8, person_email = $9 WHERE id = $1",
      [
        id,
        title,
        amount,
        interest,
        start_date,
        term,
        balance_left,
        interest_type,
        person_email,
      ]
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
    const deleteLoan = await pool.query("DELETE FROM loan WHERE id = $1", [id]);
    res.json(deleteLoan);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
