//import entries from './model/entries';
import Entries from './controller/entries'
import bodyParser from 'body-parser';

const express = require('express');
const app = express();
app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.status(200).send('Hello Ada')
});
app.get('/api/v1/entries', Entries.getEntries);
const server = app.listen(5000, () => console.log('this works') );

module.exports = server;