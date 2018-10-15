import query from '../db/connect';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const User = {

    async login(req, res){
        if(!req.body.email || !req.body.password){
            return res.status(400).send({message:'missing field'});
        }


        const text = 'SELECT * FROM users WHERE email = $1';
        const values = [req.body.email];
   
        try{
            const { rows } = await query(text, values)
            if(!rows[0]){
                return res.status(400).send('email or password incorrect');
            }
            if(!bcrypt.compareSync(req.body.password, rows[0].password )){
                return res.status(400).send('email or password incorrect');
            }
            const token = jwt.sign({userid: rows[0].id}, process.env.SECRET, {expiresIn: "7d"}  );
            return res.status(200).json({token: token});
        }
        catch(error){
            return res.status(400).send(error);
        }
        
    },

    async create(req, res){
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).send({message:'missing field'});
        }

        const hashedpass = bcrypt.hashSync(req.body.password);

        const text =  'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
        const values = [req.body.name, req.body.email, hashedpass];

        try{
            const { rows } = await query(text, values);
            const token = jwt.sign({userid: rows[0].id}, process.env.SECRET, {expiresIn: "7d"}  );
            return res.status(201).send({token: token});
        }
        catch(error){
            return res.status(400).send(error);
        }

    }
   
} 

export default User;