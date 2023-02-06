const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, {timestamps: true});

module.exports = mongoose.model('Message', MessageSchema);