import mongoose from 'mongoose';

let MessageSchema = new mongoose.Schema({
  author: {
  	type: String
  },
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