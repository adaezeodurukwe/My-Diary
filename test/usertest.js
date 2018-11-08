// User endpoints test

import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../app';
import { expect } from 'chai';
import { createUserTable, dropUserTable } from '../dbschema';



chai.use(chaiHTTP);

describe('before all tests', () => {
    before((done) => {
        createUserTable((err) => {
            if(err) throw err;
        });
        done();
    });
    after((done) => {
        dropUserTable((err) => {
            if(err) throw err;
        });
        done();
    });

    describe('create user', ()=>{
        it('create user and return token', (done)=>{
            chai.request(app)
                .post('/auth/signup')
                .send({
                    name: 'name',
                    email:'email@email.com',
                    password: 'password'
                })
                .end((err, res)=>{
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('token');
                    done();
                })
        })
        it('not create user- missing field', (done)=>{
            chai.request(app)
                .post('/auth/signup')
                .send({
                    email:'email@email.com',
                    password: 'password'
                })
                .end((err, res)=>{
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    done();
                })
        })
    });

    describe('login user', ()=>{
        it('sign in user and return token', (done)=>{
            chai.request(app)
                .post('/auth/signin')
                .send({
                    email:'email@email.com',
                    password: 'password'
                })
                .end((err, res)=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('token');
                    done();
                })
        })
        it('not login - wrong password', (done)=>{
            chai.request(app)
                .post('/auth/signin')
                .send({
                    email:'email@email.com',
                    password: 'err'
                })
                .end((err, res)=>{
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    done();
                })
        })
        it('not login - missing parameter', (done)=>{
            chai.request(app)
                .post('/auth/signin')
                .send({
                    email:'email@email.com',
                })
                .end((err, res)=>{
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    done();
                })
        })
    });
});