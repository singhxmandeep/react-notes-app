const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
