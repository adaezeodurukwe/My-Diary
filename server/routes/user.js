import express from 'express';
import User from '../controller/userController'

const router = express.Router();

router.post('/signup', User.newUser);

export default router;