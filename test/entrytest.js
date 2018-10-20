//entry endpoints tests

import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import { expect } from 'chai';
import { createEntriesTable, dropEntriesTable, createUserTable, dropUserTable } from '../dbschema';
import Entries from '../server/model/entryModel'
import Users from '../server/model/userModel'


chai.use(chaiHTTP);

let token; 
describe('before', ()=>{
    before( async() => {
        await createUserTable();
        await createEntriesTable();
    });
   
    after(async() => {
        await dropEntriesTable();
        await dropUserTable();
    });

    describe('before entry test', () => {
        before((done) => {
            chai.request(app)
                .post('/auth/signup')
                .send({
                    name: 'name',
                    email : "testemail@yahoo.com",
                    password : "test"
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    token = res.body.token;            
                    done();
                });
            });


        describe('get all entries', () => {
            it('should fetch all entries', (done) => {
                chai.request(app)
                    .get('/entries')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        done();
                    }); 
                });
            it('return unauthorized', (done) => {
                chai.request(app)
                    .get('/entries')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('message');
                        expect(res.body).property('message').to.equal('unauthorized');
                        done();
                    });
            });
        });

        describe('create entry', () => {
            it('should add entry for given user', (done) => {
                chai.request(app)
                    .post('/entries')
                    .set('x-access-token', token)
                    .send({
                        title: 'some title',
                        content: 'plenty content'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.be.a('object');
                        done();
                    });
            });
            it('unable to create - missing field', (done) => {
                chai.request(app)
                    .post('/entries')
                    .set('x-access-token', token)
                    .send({
                        title: 'some title',
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        expect(res.body).to.be.a('object');
                        done();
                    });
            });
        });

        let id;
        describe('before PUT', () => {
            beforeEach((done) => {
                chai.request(app)
                .post('/entries')
                .set('x-access-token', token)
                .send({
                    title: 'some title',
                    content: 'plenty content'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    id = res.body.id;
                    done();
                });
            });


            describe('modify an entry', () => {
                it('should modify an entry with given id', (done) => {
                    chai.request(app)
                        .put('/entries/' + id)
                        .set('x-access-token', token)
                        .send({
                            title: 'some weird title',
                            content: 'plenty more content'
                        })
                        .end((err, res) =>{
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('object');
                            done();
                        });
                    });
            }); 
        
        });

        describe('before GET by id', () => {
            beforeEach((done) => {
                chai.request(app)
                .post('/entries')
                .set('x-access-token', token)
                .send({
                    title: 'some title',
                    content: 'plenty content'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    id = res.body.id;
                    done();
                });
            });

            describe('get one entry', () => {
                it('should fetch an entry with given id', (done) => {
                    chai.request(app)
                        .get('/entries/'+ id)
                        .set('x-access-token', token)
                        .end((err, res) =>{
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('object');
                            done();
                        });
                    });
            });
        
        });
        describe('before delete', () => {
            beforeEach((done) => {
                chai.request(app)
                .post('/entries')
                .set('x-access-token', token)
                .send({
                    title: 'some title',
                    content: 'plenty content'
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    id = res.body.id;
                    done();
                });
            });

            describe('delete entry', () => {
                it('should delete entry given id', (done) => {
                    chai.request(app)
                        .delete('/entries/'+ id)
                        .set('x-access-token', token)
                        .end((err, res) =>{
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.a('object');
                            done();
                        });
                    });
            });
        
        });

    });

});