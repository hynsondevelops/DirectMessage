import mongoose from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';



let MessageSchema = new mongoose.Schema({
  author: {
  	type: String
  }
  content: {
    type: [String],
    unique: true,
  }
});


MessageSchema.methods = {
  toJSON() {
  	return {
  	}
  }
};

// Export the model
module.exports = mongoose.model('Message', MessageSchema);