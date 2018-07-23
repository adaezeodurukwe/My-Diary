//Server setup

const express = require('express');
const app = express();
import Entries from './server_files/controller/entries';
import bodyParser from 'body-parser';

//parse application
app.use(bodyParser.json());

//set port and listen
const port = parseInt(process.env.PORT, 10) || 5000;
app.listen(port, () =>console.log('this works'))


//set routes
app.get('/', (req, res)=>{
    res.send('Hello Ada')
});
app.get('/api/v1/entries', Entries.getEntries);

app.post('/api/v1/entries', Entries.createEntry);

app.delete('/api/v1/entries/:id', Entries.deleteEntry);

app.put('/api/v1/entries/:id', Entries.modifyEntry);

app.get('/api/v1/entries/:id', Entries.retrieveEntry);

module.exports = app;
