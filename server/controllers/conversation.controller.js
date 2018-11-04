const Conversation = require('../models/conversation.model');
var express = require('express');


//Simple version, without validation or sanitation
exports.getConversation = function(req, res) {
	console.log("indexing conversations")
	let conversationsNames = ""
	Conversation.find({name: "Jimmy Testing"}, function(err, conversations) {
		if (conversations.length != 0) {
			for (let i = 0; i < conversations.length; i++) {
				conversationsNames += (conversations[i].name)
			}
			res.send(conversationsNames)

		}
		else {
			res.send("Sorry no conversation")
		}

	})
}

exports.createConversation = function(req, res) {
	let conversation = new Conversation(
	        {
	            message_log: req.body.message_log,
	            users: req.body.users
	        }
	    );

	    conversation.save(function (err) {
	        if (err) {
	        	console.log(err)
	            return next(err);
	        }
	        res.send('Created conversation, ' + req.body.name)
	    })
}

exports.newConversation = function(req, res) {
	res.render("newConversation", {})
}

exports.newRegisterConversation = function(req, res) {
	res.render("register", {})
}


export async function registerConversation(req, res) {

	try {
		const conversation = await Conversation.create(req.body)
		console.log(conversation)
		return res.status(201).json(conversation)
	}
	catch (e) {
		return res.status(500).json(e)
	}
}

exports.newLoginConversation = function(req, res) {
	res.render("register", {})
}


export function loginConversation(req, res, next) {
	console.log(req.conversation)
	res.status(200).json(req.conversation.toJSON())
	return next();
}
/*



*/ 