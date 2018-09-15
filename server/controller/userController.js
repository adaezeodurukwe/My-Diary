import createUser from '../model/userModel';

class User {
    static newUser(req, res) {
        createUser(req.body.name, req.body.email, req.body.password)
        return res.status(201).json({
            message: 'created'
          });

    }

}

export default User;