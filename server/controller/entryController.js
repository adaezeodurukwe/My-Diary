import query from '../db/connect';
import moment from 'moment';

const Entry = {

    async create(req, res) {
        if(!req.userid || !req.body.title || !req.body.content){
            return res.status(400).send('missing field');
        }

        const text = 'INSERT INTO entry(userid, title, content, date_created) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [req.userid, req.body.title, req.body.content, moment(new Date())];

        try{
            const { rows } = await query(text, values);
            return res.status(201).send(rows[0]);
        }catch(error){
            return res.status(400).send(error);
        }

    },

    async getAll(req, res){
        const text = 'SELECT * FROM entry WHERE userid = $1';
        const values = [req.userid];
        
        try{
            const { rows } = await query(text, values);
            if(!rows[0]) {
                return res.status(404).send('no entry');
            }
            return res.status(201).send(rows);
        }
        catch(error){
            return res.status(400).send(error);
        }
    },

    async getEntry(req, res){
        const text = 'SELECT * FROM entry where userid = $1 AND id = $2';
        const values = [req.userid, req.params.id];

        try{
            const { rows } = await query(text, values);
            if(!rows[0]) {
                return res.status(404).send('not found');
            }
            return res.status(201).send(rows);
        }
        catch(error){
            return res.status(400).send(error);
        }
    },

    async modifyEntry(req, res){
        const text = 'SELECT * FROM entry WHERE userid = $1 AND id = $2';
        const values = [req.userid, req.params.id];
        const updatetext = 'UPDATE entry SET title = $1, content = $2 WHERE userid = $3 AND id = $4 RETURNING *';

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

        const text ='DELETE FROM entry WHERE userid = $1 AND id = $2 RETURNING *';
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