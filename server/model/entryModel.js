//user Model
import {Pool} from 'pg';
import config from '../config/config';

const pool = new Pool(config.development);
  

const createEntriesTable = async () => {
    const sql = `CREATE TABLE entries(
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

const truncateEntriesTable = async () => {
    const sql = 'TRUNCATE TABLE entries'

    try{
        await pool.query(sql)

    }catch(err) {
        console.log(err.stack)
    }
}

export { createEntriesTable, truncateEntriesTable };

require('make-runnable');