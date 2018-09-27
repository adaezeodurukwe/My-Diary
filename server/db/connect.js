import {Pool} from 'pg';
import config from '../config/config'

const pool = new Pool(config.development);

    const query = (text, params) =>{
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

export default query