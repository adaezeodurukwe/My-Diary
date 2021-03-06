// Server setup


import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes/dummyroutes';


// create an instance of express
const app = express();

// parse application
app.use(bodyParser.json());

// set port and listen
const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => console.log(`Site is live on port ${port}`));

// set routes
routes(app);
app.get('/', (req, res) => {
    res.send('Welcome to My Diary app');
});

export default app;
