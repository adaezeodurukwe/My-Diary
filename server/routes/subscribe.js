import express from 'express';
import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const publicKey = process.env.PUBLICKEY;
const privateKey = process.env.PRIVATEKEY ;

webpush.setVapidDetails('mailto:daizyodurukwe@gmail.com', publicKey, privateKey);


//subscribe route
router.post('/', (req, res) => {
    //get object
    const subscription = req.body;

    //send status
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({ title: 'Pen your thoughts'});

    //pass object into send notification
    webpush.sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

export default router;