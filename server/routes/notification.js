import express from 'express';
import Notification from '../controller/notificationController'
import Auth from '../middleware/Auth'

const router = express.Router();

router.post('/', Auth.authorize, Notification.create);
router.delete('/', Auth.authorize, Notification.delete);
export default router;
