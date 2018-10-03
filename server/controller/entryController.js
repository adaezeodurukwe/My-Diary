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
            return res.status(400).send(error)
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
            return res.status(400).send(error)
        }
    }
        

}

export default Entry;