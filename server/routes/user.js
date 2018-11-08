import express from 'express';
import User from '../controller/userController'
import Auth from '../middleware/Auth'

const router = express.Router();

router.post('/signup', User.create);
router.post('/signin', User.login);
router.get('/user', Auth.authorize, User.getUser);
router.put('/reminder', Auth.authorize, User.updateReminder);

export default router;