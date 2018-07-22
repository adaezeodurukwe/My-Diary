const chai = require('chai');
const expect = require('chai').expect;
import entries from '../server_files/model/entries';

chai.use(require('chai-http'));
let should = chai.should();

const app = require('../index.js');

describe('GET API endpoint /api/v1/entries', function() {
    this.timeout(5000); // How long to wait for a response (ms)
  
    // GET - List all entries
    it('should return all entries', function() {
      return chai.request(app)
        .get('/api/v1/entries')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
        });
    });
  
   
});

describe('POST API endpoint /api/v1/entries', function(){
    this.timeout(5000); // How long to wait for a response (ms)
    it('should add an entry', function() {
        chai.request(app)
        .post('/api/v1/entries')
        .send({
            id: 6,
            title: 'req.body.title',
            content: 'req.body.content',
            date_created: 'req.body.date_created',
            modify: 0,
        })
        .end(function(err, res) {
            expect(res).to.have.status(201);
        });
        
    });
});

describe('GET API endpoint /api/v1/entries/:id', function(){
    this.timeout(5000); // How long to wait for a response (ms)
    it('should return entry by id', function() {
        chai.request(app)
        .get('/api/v1/entries/:id')
        .send({
            id: 1
        })
        .end(function(err, res) {
            expect(res).to.have.status(200);
            res.body.should.have.property('title');
            res.body.should.have.property('content');
            res.body.should.have.property('id').eql(1);
        });
        
    });
});

