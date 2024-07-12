const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const cors = require('cors')
const pool = require('./db');
require('dotenv').config();

// app.get('/', (req, res) => {
//     res.send('hello Brennan')
// })

app.use(cors())

app.get('/expense', async (req, res) => {
    try {
        const expense = await pool.query('SELECT * FROM user_expense');
        res.json(expense.rows)
    } catch (err) {
        console.log(err);
        // console.error(error);
    }
})



app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))



