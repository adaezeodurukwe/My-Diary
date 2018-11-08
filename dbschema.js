// Database Schema

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Connect
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// Create Entries Table
const createEntriesTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS entries(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        date_created DATE NOT NULL
        )`;

    try{
        const res = await pool.query(sql)
        console.log(res)

    }catch(err) {
        console.log(err.stack)
    }
}  

// Drop Entries Table
const dropEntriesTable = async () => {
    const sql = 'DROP TABLE IF EXISTS entries'

    try{
        await pool.query(sql)
    }catch(err) {
        console.log(err.stack)
    }
}

// Create User Table
const createUserTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        reminder SMALLINT NOT NULL
        )`;

    try{
        const res = await pool.query(sql);
        console.log(res);

    }catch(err) {
        console.log(err.stack);
    }
}

// Drop User Table
const dropUserTable = async () => {
    const sql = 'DROP TABLE IF EXISTS users CASCADE';

    try{
        await pool.query(sql);

    }catch(err) {
        console.log(err.stack);
    }
}

  
module.exports = { createEntriesTable, dropEntriesTable, createUserTable, dropUserTable };

require('make-runnable');