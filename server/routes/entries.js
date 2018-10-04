import express from 'express';
import Entry from '../controller/entryController'
import Auth from '../middleware/Auth'

const router = express.Router();

router.post('/', Auth.authorize, Entry.create);
router.get('/', Auth.authorize, Entry.getAll);
router.get('/:id', Auth.authorize, Entry.getEntry)
router.put('/:id', Auth.authorize, Entry.modifyEntry)
export default router;
