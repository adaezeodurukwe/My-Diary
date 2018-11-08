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
            const user = await users.login(req.body.email)
            if(!user){
                return res.status(404).send({message:'email or password incorrect'});
            }
            if(!bcrypt.compareSync(req.body.password, user.password )){
                return res.status(400).send({message:'email or password incorrect'});
            }
            const token = jwt.sign({userid: user.id}, process.env.SECRET, {expiresIn: "7d"}  );
            return res.status(200).json({token: token});
        }
        catch(error){
            return res.status(400).send({error: error});
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

    },

    async getUser(req, res){
        try{
            let user = await users.getUser(req.userid)
            return res.status(200).send(user)
        }
        catch(error){
            return res.status(400).send({error: error});
        }
    },

    async updateReminder(req, res){
        try{
            let userDetail = await users.getUser(req.userid)
            let value = userDetail.reminder === 0 || userDetail.reminder === null? 1 : 0;
            let update = await users.updateReminder(value, req.userid)
            return res.status(200).send(update);
        }
        catch(error){
            return res.status(400).send({error: error});
        }
    }
   
} 

export default User;