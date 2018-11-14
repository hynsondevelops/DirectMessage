const User = require('../models/user.model');
var express = require('express');

import {myPassport} from '../services/auth.services'

let ObjectId = require('mongodb').ObjectId

//Simple version, without validation or sanitation
exports.getUser = function(req, res) {
	console.log("indexing users")
	let usersNames = ""
	User.find({name: "Jimmy Testing"}, function(err, users) {
		if (users.length != 0) {
			for (let i = 0; i < users.length; i++) {
				usersNames += (users[i].name)
			}
			res.send(usersNames)

		}
		else {
			res.send("Sorry no user")
		}

	})
}

exports.showUser = function(req, res) {
	let regexQuery = new RegExp(req.params.query, "i")
	console.log(regexQuery)

	User.find({ $or: [ { email: regexQuery }, { name: regexQuery } ] }, function(err, users) {
		res.send(users)
	})
}

exports.createUser = function(req, res) {
	let user = new User(
	        {
	            name: req.body.name,
	        }
	    );

	    user.save(function (err) {
	        if (err) {
	        	console.log(err)
	            return next(err);
	        }
	        res.send('Created user, ' + req.body.name)
	    })
}

exports.newUser = function(req, res) {
	res.render("newUser", {})
}

exports.newRegisterUser = function(req, res) {
	res.render("register", {})
}


export async function registerUser(req, res, next) {
	console.log("register")
	try {
		console.log(req.body)
		const user = await User.create(req.body)
		console.log(user)
		if (!user) {
			return res.status(400).json(req.user.email + " is taken")
		}
		return res.status(201).json(user)
	}
	catch (e) {
		console.log("e caught")
		return next(e)
	}
}

exports.newLoginUser = function(req, res) {
	res.render("register", {})
}


export function loginUser(req, res, next) {
	myPassport.authenticate('local', function(err, user, info) {
		console.log("login")
		console.log(info)
		console.log("user below")
		console.log(user)
	      if (err) { return next(err) }
	      if (!user) { return res.status(500).json(info.message) }
	      console.log(user.toJSON())
	      res.send(user.toJSON())
	    })(req, res, next);  
}

export function addFriend(req, res) {
	console.log("Controller add friend")
	console.log(req.body)
	let loggedInUserId = ObjectId(req.body.loggedInUser._id)
	let newFriendId = ObjectId(req.body.newFriend._id)
	User.findOneAndUpdate({_id: loggedInUserId}, { $addToSet: { friends: newFriendId}}, {new: true}, function (err, user) {
		  if (err) return handleError(err);
		  res.send(user);
	})
	// 
	/*
	User.updateOne(ObjectId(user_id), function(err, user) {
		user.friends.push(ObjectId("5bd761afac53c523a5b2a95c"))
		console.log(user)
		user.save()
		console.log("saved")
		res.send(newUser)
	})

	let updatedUser = User.updateOne(
		{_id: ObjectId(user_id)},
		{ $addToSet: { friends: ObjectId("5bd761afac53c523a5b2a95c")} }
	)
	res.send(updatedUser)
	*/
}

export function getFriends(req, res) {
	console.log("getFriends")
	console.log(req.params)
	let loggedInUserId = req.params.user_id
	User.find({friends: {$in: [loggedInUserId]} }, function(err, users) {
		if (err) return handleError(err)
		res.send(users)
	})
}
/*



*/ 