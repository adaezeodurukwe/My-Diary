import express from 'express';
import Entry from '../controller/entryController'
import Auth from '../middleware/Auth'

const router = express.Router();

router.post('/', Auth.authorize, Entry.create);

export default router;
