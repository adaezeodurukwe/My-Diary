//user Model
import {Pool} from 'pg';
import config from '../config/config';

const pool = new Pool(config.development);

const createUserTable = async () => {
    const sql = `CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL
        )`;

    try{
        const res = await pool.query(sql);
        console.log(res);

    }catch(err) {
        console.log(err.stack);
    }
}  
const truncateUserTable = async () => {
    const sql = 'TRUNCATE TABLE users CASCADE';

    try{
        await pool.query(sql);

    }catch(err) {
        console.log(err.stack);
    }
}


export { createUserTable, truncateUserTable };

require('make-runnable');