//Server setup

import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './server/routes/user';
import entryRouter from './server/routes/entries'
import dotenv from 'dotenv';

dotenv.config();


//create an instance of express
const app = express();

//parse application
app.use(bodyParser.json());

//set port and listen
const port = parseInt(process.env.PORT, 10) || 5000;
app.listen(port, () =>console.log('Site is live on port ' + port))


app.use('/users', userRouter);
app.use('/entries', entryRouter)
app.use('/', (req, res)=>{
    res.send('users')
});

export default app;
