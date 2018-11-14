const User = require('../models/user.model');
var express = require('express');

import {myPassport} from '../services/auth.services'

let ObjectId = require('mongodb').ObjectId

exports.showUser = function(req, res) {
	let regexQuery = new RegExp(req.params.query, "i")
	User.find({ $or: [ { email: regexQuery }, { name: regexQuery } ] }, function(err, users) {
		res.send(users)
	})
}

export async function registerUser(req, res, next) {
	try {
		const user = await User.create(req.body)
		if (!user) {
			return res.status(400).json(req.user.email + " is taken")
		}
		return res.status(201).json(user)
	}
	catch (e) {
		return next(e)
	}
}


export function loginUser(req, res, next) {
	myPassport.authenticate('local', function(err, user, info) {
	      if (err) { return next(err) }
	      if (!user) { return res.status(500).json(info.message) }
	      res.send(user.toJSON())
	    })(req, res, next);  
}

export function addFriend(req, res) {
	let loggedInUserId = ObjectId(req.body.loggedInUser._id)
	let newFriendId = ObjectId(req.body.newFriend._id)
	User.findOneAndUpdate({_id: loggedInUserId}, { $addToSet: { friends: newFriendId}}, {new: true}, function (err, user) {
		  if (err) return handleError(err);
		  res.send(user);
	})
}

export function getFriends(req, res) {
	let loggedInUserId = req.params.user_id
	User.find({friends: {$in: [loggedInUserId]} }, function(err, users) {
		if (err) return handleError(err)
		res.send(users)
	})
}
/*



*/ 