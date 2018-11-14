process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Conversation = require('../models/conversation.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let ObjectId = require('mongodb').ObjectId


chai.use(chaiHttp);

describe('Conversations', () => {
    beforeEach((done) => {
        Conversation.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET conversation', () => {
      it('it should GET all the conversations', (done) => {
        chai.request(server)
            .get('/login')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST login', () => {
      it('it should allow a registered conversation to login', (done) => {
          let conversation = {
              name: "Adam",
              password: "password"
          }
        chai.request(server)
            .post('/conversation/login')
            .send(conversation)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Conversation successfully logged in!');
                  res.body.conversation.should.have.property('name');
                  console.log(res.body.conversation)

              done();
            });
      });

  });


  /*
  * Test the /POST route
  */
  describe('/POST register', () => {
      it('it should not login with incorrect credentials', (done) => {
          let conversation = {
              name: "Adam",
              password: "password"
          }
        chai.request(server)
            .post('/conversation/register')
            .send(conversation)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Conversation successfully registered!');
                  res.body.conversation.should.have.property('name');
                  console.log(res.body.conversation)

              done();
            });
      });

  });


});
