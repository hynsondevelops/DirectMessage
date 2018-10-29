import mongoose from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

import {hashSync, compareSync } from 'bcrypt-nodejs'

import jwt from 'jsonwebtoken';

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: [true, "Email address required!"],
		validate: {
			validator(email) {
				return validator.isEmail(email);
			}
		},
		message: '{VALUE} is not a valid email.',
	},
    name: {
    	type: String, 
    	required: true, 
    	max: 100
    },
    password: {
    	type: String
    },
    conversations: {
      type: [String]
    }
});

UserSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!',
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
  	return jwt.sign({
  		_id: this._id,
	  	},
	  	"SecretKey",
  	);
  },
  toJSON() {
  	return {
  		_id: this._id,
  		name: this.name,
  		token: `JWT ${this.createToken()}`,
  		email: this.email,
  	}
  }
};

// Export the model
module.exports = mongoose.model('User', UserSchema);