// notifications controller

import notifications from '../model/notificationsModel';
import moment from 'moment';

const Notification = {

    async create(req, res) {
        if(!req.userid || !req.body.time){
            return res.status(400).send({message: 'missing field'});
        }

        try{
            const newNotification = await notifications.create(req.userid , req.body.time);
            return res.status(201).send(newNotification);
        }catch(error){
            return res.status(400).send(error);
        }

    },
        
    async delete(req, res){

        try{
            const rows = await notifications.delete(req.userid);
            if(!rows[0]){
                return res.status(400).send('not found');
            }
            return res.status(200).send('notification deleted');
        }
        catch(error){
            return res.status(400).send(error);
        }

    },

    async modifyDate(req, res){

        try{
            const notification = await notifications.getone(req.userid);
            if(!notification) {
                //pass
            }
            const time = notification.alert_time || req.time;
            const date = moment(new Date())

            await notifications.modify(time, date, req.userid);
            return res.status(200);
        }
        catch(error){
            throw error;
        }
    }
}

export default Notification;