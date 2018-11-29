process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user.model');
let Conversation = require('../models/conversation.model');


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
           Conversation.remove({}, (err) => {
             done();
           })            
        });    
    });
  /*
  * Test the /POST route
  */

  describe('/POST /create', () => {
      it('it should allow a registered user to login', (done) => {
        let loggedInUser = new User(loggedInUserInfo)
	      loggedInUser.save((err, loggedInUser) => {
          	chai.request(server)
              .post('/conversation/create/')
              .send({user_ids: [loggedInUser._id], message_log: ["message1"]}) 
              .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.user_ids[0].should.have.eql(loggedInUser._id.toString())
                  res.body.message_log.should.have.eql(["message1"])
                  done();
              });
          })
      });

  });

  describe('/POST /add_user/:user_id', () => {
  	it('should add a user to a conversation', (done) => {
          let loggedInUser = new User(loggedInUserInfo)
		  loggedInUser.save((err, loggedInUser) => {
		    let newFriend = new User({
		      name: "Jim",
		      password: "password",
		      email: "testemail1@gmail.com",
		      friends: [loggedInUser._id]
		    })
		    newFriend.save((err, newFriend) => {
		    	let conversation = new Conversation({
		    		user_ids: [loggedInUser._id],
		    		message_log: ["message1", "message2"]
		    	})
		    	conversation.save((err, conversation) => {
		    	  chai.request(server)
		    	      .post('/conversation/add_user/' + newFriend._id + "/" + conversation._id)
		    	      .send() 
		    	      .end((err, res) => {
		    	          res.should.have.status(200);
		    	          res.body.should.be.a('object');
		    	          res.body.user_ids[1].should.have.eql(newFriend._id.toString())
		    	          res.body.message_log.should.have.eql(["message1", "message2"])
		    	          done();
		    	      });
		    	})
		    })
      });
  	})
  })
})