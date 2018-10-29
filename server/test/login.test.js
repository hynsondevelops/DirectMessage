process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
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
      it('it should allow a registered user to login', (done) => {
          let user = {
              name: "Adam",
              password: "password"
          }
        chai.request(server)
            .post('/user/login')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('User successfully logged in!');
                  res.body.user.should.have.property('name');
                  console.log(res.body.user)

              done();
            });
      });

  });


  /*
  * Test the /POST route
  */
  describe('/POST register', () => {
      it('it should not login with incorrect credentials', (done) => {
          let user = {
              name: "Adam",
              password: "password"
          }
        chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('User successfully registered!');
                  res.body.user.should.have.property('name');
                  console.log(res.body.user)

              done();
            });
      });

  });


});
