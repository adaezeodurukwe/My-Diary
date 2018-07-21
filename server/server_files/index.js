//import entries from './model/entries';
import Entries from './controller/entries'

const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('Hello Ada')
});
app.get('/api/v1/entries', Entries.getEntries);
app.listen(5000, () => console.log('this works') );
