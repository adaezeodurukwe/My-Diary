import jwt from 'jsonwebtoken';
import query from '../db/connect';

const Auth = {

    async authorize(req, res, next){
        const token = req.headers['x-access-token']
        if(token == null){
            return res.status(404).send({message: 'unauthorized'});
        }
        try{
            const decoded = await jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE id = $1'
            const { rows } = await query(text, decoded.userid)
            if(row[0] == null){
                return res.status(400).send({message: 'invalid token'});
            }
            req.user = decoded.userid
        }catch(error){
            return res.status(404).send(error);
        }
    }
}

export default Auth;