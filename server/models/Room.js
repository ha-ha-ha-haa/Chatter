const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type:String,
  unique: true
  },
  image:{
    type:String,
  },
  desc:{
    type:String,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  Admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  
},  {timestamps: true});

module.exports = mongoose.model('Room', RoomSchema);