//users controller

import users from '../model/userModel';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const User = {

    async login(req, res){
        if(!req.body.email || !req.body.password){
            return res.status(400).send({message:'missing field'});
        }
   
        try{
            const user = await users.getUser(req.body.email)
            if(!user){
                return res.status(400).send('email or password incorrect');
            }
            if(!bcrypt.compareSync(req.body.password, user.password )){
                return res.status(400).send('email or password incorrect');
            }
            const token = jwt.sign({userid: user.id}, process.env.SECRET, {expiresIn: "7d"}  );
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

        try{
            const newUser = await users.create(req.body.name, req.body.email, hashedpass);
            const token = jwt.sign({userid: newUser.id}, process.env.SECRET, {expiresIn: "7d"}  );
            return res.status(201).send({token: token});
        }
        catch(error){
            return res.status(400).send({error: error});
        }

    }
   
} 

export default User;