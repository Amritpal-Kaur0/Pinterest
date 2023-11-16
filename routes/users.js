const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


mongoose.createConnection('mongodb://127.0.0.1:27017/pinterest');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  dp: {
    type: String,
  },
  fullname: {
    type: String,
    required:true,
  },
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);


