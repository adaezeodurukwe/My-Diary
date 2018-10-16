
import query from '../db/connect';
import moment from 'moment';

const Notification = {

    async create(req, res) {
        if(!req.userid || !req.body.time){
            return res.status(400).send({message: 'missing field'});
        }

        const text = 'INSERT INTO notifications(user_id, alert_time, last_entry) VALUES($1, $2, $3) RETURNING *';
        const values = [req.userid, req.body.time, moment(new Date())];

        try{
            const { rows } = await query(text, values);
            return res.status(201).send(rows[0]);
        }catch(error){
            return res.status(400).send(error);
        }

    },
        
    async delete(req, res){

        const text ='DELETE FROM notifications WHERE user_id = $1 RETURNING *';
        const values = [req.userid];

        try{
            const rows = query(text, values);
            if(!rows[0]){
                return res.status(400).send('not found');
            }
            return res.status(200).send('entry deleted');
        }
        catch(error){
            return res.status(400).send(error);

        }

    },

    async modifyDate(userid){
        const text = 'SELECT * FROM notifications WHERE user_id = $1';
        const values = [userid];
        const updatetext = 'UPDATE notifications SET last_entry = $1';

        try{
            const { rows } = await query(text, values);
            if(!rows[0]) {
                //pass
            }
            const updatevalues = [moment(new Date())];
            await query(updatetext, updatevalues);
        }
        catch(error){
            throw error;
        }
    }
}

export default Notification;