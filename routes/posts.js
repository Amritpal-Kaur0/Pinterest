const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pinterest')

const postSchema = new mongoose.Schema({
 user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
 },
 image:{
    type: String,
 },
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Post', postSchema);