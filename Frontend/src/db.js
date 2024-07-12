//import React from "react";
// import postgres from 'postgres';

// const sql = postgres({
//   host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
//   port                 : 5432,          // Postgres server port[s]
//   database             : 'Finance Tracker Website',            // Name of database to connect to
//   username             : 'postgres',            // Username of database user
//   password             : '',            // Password of database user
// })

// export default sql

import pg from 'pg'
const { Client } = pg
const client = new Client()
await client.connect()
 
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()