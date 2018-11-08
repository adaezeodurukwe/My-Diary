// Connect to Database

import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

/**
 * @description resolve datadase query
 * @param {*} text 
 * @param {*} params 
 * @returns {Promise}
 */
const query = (text, params) => {
    return new Promise((resolve, reject)=>{
        pool.query(text, params)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

export default query;