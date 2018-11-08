// Connect to Database

import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
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