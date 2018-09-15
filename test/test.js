// API test

import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../index.js';

chai.use(chaiHttp);


describe('GET API endpoint /api/v1/entries', () => {
    // GET - List all entries
    it('should return all entries', (done) => {
        chai.request(app)
            .get('/api/v1/entries')
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                done();
            });
    });
});

describe('POST API endpoint /api/v1/entries', () => {
    // POST - Add entries
    it('should add an entry', (done) => {
        chai.request(app)
            .post('/api/v1/entries')
            .send({
                title: 'req.body.title',
                content: 'req.body.content',
                date_created: 'req.body.date_created',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                done();
            });
    });
});

describe('PUT API endpoint /api/v1/entries/:id', () => {
    it('should modify an entry with given id', (done) => {
        chai.request(app)
            .put('/api/v1/entries/2')
            .send({
                title: 'req.body.title1',
                content: 'req.body.content1',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should return 404 if given id is not found', (done) => {
        chai.request(app)
            .put('/api/v1/entries/6')
            .send({
                title: 'req.body.title1',
                content: 'req.body.content1',
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

describe('GET API endpoint /api/v1/entries/:id', () => {
    it('should return entry by id', (done) => {
        chai.request(app)
            .get('/api/v1/entries/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should return 404 if given id is not found', (done) => {
        chai.request(app)
            .get('/api/v1/entries/6')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

describe('DELETE API endpoint /api/v1/entries/:id', () => {
    it('should delete an entry with given id', (done) => {
        chai.request(app)
            .delete('/api/v1/entries/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should return 404 if given id is not found', (done) => {
        chai.request(app)
            .delete('/api/v1/entries/6')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});
