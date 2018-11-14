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
  describe('/GET user/:id', () => {
      it('it should GET a user by id', (done) => {
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
            console.log(newFriend)
            newFriend.save((err, newFriend) => {
              console.log("Hi new friend")
              console.log(newFriend)
              chai.request(server)
                  .post('/user/add_friend')
                  .send({loggedInUser: loggedInUser, newFriend: newFriend})
                  .end((err, res) => {
                      console.log(res.body)
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      console.log(newFriend._id)
                      console.log(res.body.friends[0])
                      console.log(newFriend._id)
                      console.log(newFriend._id.equals(res.body.friends[0]))
                      console.log()
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
        console.log(newFriend)
        newFriend.save((err, newFriend) => {
          console.log("Hi new friend")
          console.log(newFriend)
          chai.request(server)
              .get('/user/get_friends/' + loggedInUser._id)
              .send({user_id: 1})
              .end((err, res) => {
                  console.log(res.body)
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body[0].should.have.property('name', newFriend.name);
                  done();
              });
          })
      })
    });
  })

});
