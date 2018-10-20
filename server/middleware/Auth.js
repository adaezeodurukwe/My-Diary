import jwt from 'jsonwebtoken';
import query from '../db/connect';

const Auth = {

    async authorize(req, res, next){
        const token = req.headers['x-access-token']
        if(!token){
            return res.status(401).send({message: 'unauthorized'});
        }
        try{
            const decoded = await jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE id = $1';
            const value = [decoded.userid]
            const { rows } = await query(text, value)
            if(!rows[0]){
                return res.status(400).send({message: 'invalid token'});
            }
            req.userid = decoded.userid
            next();
        }catch(error){
            return res.status(404).send(error);
        }
    }
}

export default Auth;