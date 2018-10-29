const User = require('../models/user.model');
var express = require('express');


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


export async function registerUser(req, res) {

	try {
		const user = await User.create(req.body)
		console.log(user)
		return res.status(201).json(user)
	}
	catch (e) {
		return res.status(500).json(e)
	}
}

exports.newLoginUser = function(req, res) {
	res.render("register", {})
}


export function loginUser(req, res, next) {
	console.log(req.user)
	res.status(200).json(req.user.toJSON())
	return next();
}
/*



*/ 