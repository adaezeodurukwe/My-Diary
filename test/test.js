//API test

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import {expect} from 'chai'

chai.use(chaiHttp);


describe('GET API endpoint /api/v1/entries', () => {  
    // GET - List all entries
    it('should return all entries', () => {
      return chai.request(app)
        .get('/api/v1/entries')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
        });
    });
  
   
});

describe('POST API endpoint /api/v1/entries', () =>{    
    // POST - Add entries
    it('should add an entry', () => {
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
            expect(res.body).to.be.a('object');
        });
        
    });
});

describe('PUT API endpoint /api/v1/entries/:id', () => {
    it('should modify an entry with given id', function() {
        chai.request(app)
        .put('/api/v1/entries/2')
        .send({
            title: 'req.body.title1',
            content: 'req.body.content1'
        })
        .end(function(err, res) {
            expect(res).to.have.status(200);
        });
    });
    it('should return 404 if given id is not found', () => {
        chai.request(app)
        .put('/api/v1/entries/6')
        .send({
            title: 'req.body.title1',
            content: 'req.body.content1'
        })
        .end(function(err, res) {
            expect(res).to.have.status(404);
        });
    });
});

describe('GET API endpoint /api/v1/entries/:id', () => {
    it('should return entry by id', function() {
        chai.request(app)
        .get('/api/v1/entries/1')
        .end(function(err, res) {
            expect(res).to.have.status(200);
        });
    });
    it('should return 404 if given id is not found', () => {
        chai.request(app)
        .get('/api/v1/entries/6')
        .end(function(err, res) {
            expect(res).to.have.status(404);
        });
    });
});

describe('DELETE API endpoint /api/v1/entries/:id', () => {
    it('should delete an entry with given id', function() {
        chai.request(app)
        .delete('/api/v1/entries/1')
        .end(function(err, res) {
            expect(res).to.have.status(200);
        });
    });
    it('should return 404 if given id is not found', () => {
        chai.request(app)
        .delete('/api/v1/entries/6')
        .end(function(err, res) {
            expect(res).to.have.status(404);
           
        }); 
    });

});

