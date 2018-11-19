import mongoose from 'mongoose';

let ConversationSchema = new mongoose.Schema({
	user_ids: {
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
      _id: this._id,
      user_ids: this.user_ids,
      message_log: this.message_log
  	}
  }
};

// Export the model
module.exports = mongoose.model('Conversation', ConversationSchema);