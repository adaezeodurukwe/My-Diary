
import query from '../db/connect';
import moment from 'moment';
import notification from './notificationController';

const Entry = {

    async create(req, res) {
        if(!req.userid || !req.body.title || !req.body.content){
            return res.status(400).send({message: 'missing field'});
        }

        const text = 'INSERT INTO entries(user_id, title, content, date_created) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [req.userid, req.body.title, req.body.content, moment(new Date())];

        try{
            const { rows } = await query(text, values);
            notification.modifyDate();
            return res.status(201).send(rows[0]);
        }catch(error){
            return res.status(400).send(error);
        }

    },

    async getAll(req, res){
        const text = 'SELECT * FROM entries WHERE user_id = $1';
        const values = [req.userid];
        
        try{
            const { rows } = await query(text, values);
            if(!rows[0]) {
                return res.status(200).send({ message :'no entry'});
            }
            return res.status(200).send(rows);
        }
        catch(error){
            return res.status(400).send(error);
        }
    },

    async getEntry(req, res){
        const text = 'SELECT * FROM entries where user_id = $1 AND id = $2';
        const values = [req.userid, req.params.id];

        try{
            const { rows } = await query(text, values);
            if(!rows[0]) {
                return res.status(404).send({message :'not found'});
            }
            return res.status(200).send(rows);
        }
        catch(error){
            return res.status(400).send(error);
        }
    },

    async modifyEntry(req, res){
        const text = 'SELECT * FROM entries WHERE user_id = $1 AND id = $2';
        const values = [req.userid, req.params.id];
        const updatetext = 'UPDATE entries SET title = $1, content = $2 WHERE user_id = $3 AND id = $4 RETURNING *';

        try{
            const { rows } = await query(text, values);
            if(!rows[0]) {
                return res.status(404).send('not found');
            }

            const diff = (moment(new Date()) - rows[0].date_created)/3600000;
            if(diff >= 24){
                return res.status(400).send({message:'cannot update entry'});
            }

            const updatevalues = [req.body.title, req.body.content, req.userid, req.params.id];
            const update = await query(updatetext, updatevalues);

            return res.status(200).send(update.rows[0]);
        }
        catch(error){
            return res.status(400).send(error);
        }
    },
        
    async delete(req, res){

        const text ='DELETE FROM entries WHERE user_id = $1 AND id = $2 RETURNING *';
        const values = [req.userid, req.params.id];

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

    }
}

export default Entry;