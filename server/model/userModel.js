//user Model

import query from '../db/connect';

const users = {

    async create(name, email, pass){

        const text =  'INSERT INTO users(name, email, password, reminder) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [name, email, pass, 0];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    async login(email){

        const text = 'SELECT * FROM users WHERE email = $1';
        const values = [email];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    async getUser(id){
        const text = 'SELECT * FROM users WHERE id = $1';
        const values = [id];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    async updateReminder(value, u_id){
        const text = 'UPDATE users SET reminder = $1 WHERE id = $2 RETURNING *';
        const values = [value, u_id];
        
        try{
            const { rows }= await query(text, values)
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    }

}


export default users ;

