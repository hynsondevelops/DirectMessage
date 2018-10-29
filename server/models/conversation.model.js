import mongoose from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

import {hashSync, compareSync } from 'bcrypt-nodejs'

import jwt from 'jsonwebtoken';

let ConversationSchema = new mongoose.Schema({
	user_emails: {
		type: [String],
		unique: true,
		}
	},
  message_log: {
    type: [String],
    unique: true,
  }
});


ConversationSchema.methods = {
  toJSON() {
  	return {
  	}
  }
};

// Export the model
module.exports = mongoose.model('Conversation', ConversationSchema);