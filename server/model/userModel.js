import pool from '../db/connect';

const createUser = (name, email, password) =>{

    const query = {
        text : 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
        values : [name, email, password]
    }
    
    return pool.query(query)

}

export default createUser