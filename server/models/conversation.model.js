import mongoose from 'mongoose';

let ConversationSchema = new mongoose.Schema({
	user_emails: {
		type: [String],
		unique: true,
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