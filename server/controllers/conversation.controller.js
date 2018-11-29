const Conversation = require('../models/conversation.model');
var express = require('express');

exports.createConversation = async function(req, res) {
	try {
		const conversation = await Conversation.create(req.body)
		if (!conversation) {
			return res.status(400).json("Something went wrong.")
		}
		return res.status(201).json(conversation)
	}
	catch (e) {
		return next(e)
	}
}

exports.addUserToConversation = function(req, res) {
	//get user to be added
	let userIdToAdd = req.params.user_id
	//get conversation to add user to
	let conversationId = req.params.conversation_id
	//Update conversation to include new user in user_ids
	Conversation.findOneAndUpdate({_id: conversationId}, { $addToSet: { user_ids: userIdToAdd}}, {new: true}, function (err, conversation) {
		  if (err) return handleError(err);
		  res.send(conversation);
	})
}
