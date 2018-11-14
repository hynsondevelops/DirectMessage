process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let ObjectId = require('mongodb').ObjectId



chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => { 
           done();           
        });        
    });
  /*
  * Test the /POST route
  */
  describe('/POST login', () => {
      it('it should allow a registered user to login', (done) => {
          let loggedInUserInfo = {
                    name: "Adam",
                    password: "password",
                    email: "testemai1l@gmail.com",
                }
          let loggedInUser = new User(loggedInUserInfo)
          loggedInUser.save((err, loggedInUser) => {
            chai.request(server)
                .post('/user/login')
                .send(loggedInUserInfo)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('email').eql(loggedInUser.email);
                  done();
                });
          })
      });

  });


  /*
  * Test the /POST route
  */
  describe('/POST register', () => {
      it('it should allow a user to register', (done) => {
          let loggedInUser = {
                    name: "Adam",
                    password: "password",
                    email: "testemai1l@gmail.com",
                }

        chai.request(server)
            .post('/user/register')
            .send(loggedInUser)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.email.should.eql(loggedInUser.email);

              done();
            });
      });

  });



  describe('/POST add_friend/', () => {
      it('it should not login with incorrect credentials', (done) => {
          let loggedInUser = new User({
              name: "Adam",
              password: "password",
              email: "testemai1l@gmail.com",
          })
          loggedInUser.save((err, loggedInUser) => {
            let newFriend = new User({
              name: "Jim",
              password: "password",
              email: "testemail1@gmail.com",
            })
            newFriend.save((err, newFriend) => {
              chai.request(server)
                  .post('/user/add_friend')
                  .send({loggedInUser: loggedInUser, newFriend: newFriend})
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.friends.should.contain(ObjectId(newFriend._id).toString())
                      done();
                  });
            });
          });
      });
  });


  describe('GET /get add_friend/', () => {
    it('it should not login with incorrect credentials', (done) => {
      let loggedInUser = new User({
          name: "Adam",
          password: "password",
          email: "testemai1l@gmail.com",
      })
      loggedInUser.save((err, loggedInUser) => {
        let newFriend = new User({
          name: "Jim",
          password: "password",
          email: "testemail1@gmail.com",
          friends: [loggedInUser._id]
        })
        newFriend.save((err, newFriend) => {
          chai.request(server)
              .get('/user/get_friends/' + loggedInUser._id)
              .send()
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body[0].should.have.property('name', newFriend.name);
                  done();
              });
          })
      })
    });
  })

  describe('GET /show/:query', () => {
      it('it should allow searching by email inclusively', (done) => {
        let loggedInUser = new User({
            name: "Adam",
            password: "password",
            email: "testemail@gmail.com",
        })
        loggedInUser.save((err, loggedInUser) => {
          let newFriend = new User({
            name: "Jim",
            password: "password",
            email: "testemail1@gmail.com",
            friends: [loggedInUser._id]
          })
          newFriend.save((err, newFriend) => {
            chai.request(server)
                .get('/user/show/' + "test")
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('name', loggedInUser.name);
                    res.body[1].should.have.property('name', newFriend.name);
                    done();
                });
            })
        })
      });

      it('it should allow searching by name inclusively', (done) => {
        let loggedInUser = new User({
            name: "Adam",
            password: "password",
            email: "testemail@gmail.com",
        })
        loggedInUser.save((err, loggedInUser) => {
          let newFriend = new User({
            name: "Jim",
            password: "password",
            email: "testemail1@gmail.com",
            friends: [loggedInUser._id]
          })
          newFriend.save((err, newFriend) => {
            chai.request(server)
                .get('/user/show/' + "m")
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('name', loggedInUser.name);
                    res.body[1].should.have.property('name', newFriend.name);
                    done();
                });
            })
        })
      });
    })

});
