// All dummy routes
 
import Entries from '../controller/dummyController';

export default (app) => {
    app.get('/api/v1/entries', Entries.getEntries);

    app.post('/api/v1/entries', Entries.createEntry);

    app.delete('/api/v1/entries/:id', Entries.deleteEntry);

    app.put('/api/v1/entries/:id', Entries.modifyEntry);

    app.get('/api/v1/entries/:id', Entries.retrieveEntry);
};
