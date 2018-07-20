//import entries from './model/entries';
import Entries from './controller/entries'
import bodyParser from 'body-parser';

const express = require('express');
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Hello Ada')
});
app.get('/api/v1/entries', Entries.getEntries);
app.get('/api/v1/entries/:id', Entries.retrieveEntry);
app.listen(5000, () => console.log('this works') );
