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

    }
        

}

export default Entry;