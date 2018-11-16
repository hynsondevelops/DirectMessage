process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let ObjectId = require('mongodb').ObjectId


let loggedInUserInfo = {
    name: "Adam",
    password: "password",
    email: "testemai1l@gmail.com",
}




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

      it('it should not allow a unregistered user to login', (done) => {
        chai.request(server)
            .post('/user/login')
            .send(loggedInUserInfo)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.eql("User does not exist!")
                done();
            });
      })

  });


  /*
  * Test the /POST route
  */
  describe('/POST register', () => {
      it('it should allow a user to register', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(loggedInUserInfo)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.email.should.eql(loggedInUserInfo.email);

              done();
            });
      });

      it ('should not allow a user to register if the email is invalid', (done) => {
          let loggedInUser = {
                    name: "Adam",
                    password: "password",
                    email: "testemail",
                }

        chai.request(server)
            .post('/user/register')
            .send(loggedInUser)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('string');
                  res.body.should.eql(loggedInUser.email + " must be a valid email");
              done();
            });
      });

      it ('should not allow a user to register if the email is taken', (done) => {
        let loggedInUser = new User(loggedInUserInfo)
        loggedInUser.save((err, loggedInUser) => {
          chai.request(server)
              .post('/user/register')
              .send(loggedInUserInfo)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('string');
                    res.body.should.eql(loggedInUserInfo.email + " already taken!");

                done();
              });
        })
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


  describe('GET get_friends/:user_id', () => {
    it('it should return the list of user objects that a friend has added', (done) => {
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
