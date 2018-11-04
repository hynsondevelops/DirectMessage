const Message = require('../models/message.model');
var express = require('express');

//Simple version, without validation or sanitation
function getUser(req, res) {
	Message.find({name: "Jimmy Testing"}, function(err, users) {
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
