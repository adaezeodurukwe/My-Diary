//user Model

import query from '../db/connect';

const users = {

    async create(name, email, pass){

        const text =  'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
        const values = [name, email, pass];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    async getUser(email){

        const text = 'SELECT * FROM users WHERE email = $1';
        const values = [email];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    }

}


export default users ;

