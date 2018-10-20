// notifications model

import query from '../db/connect';

const notifications = {
    
    async create(u_id, time){

        const text = 'INSERT INTO notifications(user_id, alert_time, last_entry) VALUES($1, $2, $3) RETURNING *';
        const values = [u_id, time, moment(new Date())];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    async getone(u_id){
        
        const text = 'SELECT * FROM notifications WHERE user_id = $1';
        const values = [u_id];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    async modify(u_id, id, time, date){
        const text = 'UPDATE notifications SET alert_time = $1, last_entry = $2 WHERE user_id = $3 RETURNING *';
        const values = [time, date, u_id];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    },

    async delete(u_id){

        const text ='DELETE FROM notifications WHERE user_id = $1 RETURNING *';
        const values = [u_id];

        try{
            const { rows }= await query(text, values);
            return rows[0];
    
        }catch(err) {
            console.log(err.stack);
        };
    }
}


export default notifications