const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for notes
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Correct reference to ObjectId
    ref: "User", // Referencing the User model
    required: true // Ensure this field is always present
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Note model
const Note = mongoose.model('Note', NotesSchema);

module.exports = Note;
