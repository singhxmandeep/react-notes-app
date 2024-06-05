const express = require("express");
const fetchUser = require("../middleware/fetchUser"); // Middleware to authenticate the user
const router = express.Router();
const Note = require("../models/Note"); // Note model
const { body, validationResult } = require("express-validator"); // For validating request data

// Route 01: Get all the notes of the user using GET "/api/notes/fetchallnotes" - Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    // Find all notes associated with the authenticated user
    const notes = await Note.find({ user: req.user.id });
    // Send the notes as JSON response
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    // Send a 500 Internal Server Error response if something goes wrong
    res.status(500).send("Internal Server Error");
  }
});

// Route 02: Add a new note for the user using POST "/api/notes/addnote" - Login required
router.post("/addnote",fetchUser,
  [
    // Validation rules for the incoming request body
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are validation errors, return a 400 response with the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create a new note instance with the request data
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id, // Associate the note with the authenticated user
      });

      // Save the note to the database
      const savedNote = await note.save();

      // Send the saved note as a JSON response
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      // Send a 500 Internal Server Error response if something goes wrong
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 03: Update a existing note for the user using put "/api/notes/updatenote" - Login required
router.put("/updatenote/:id",fetchUser, async (req, res) => {
    const {title, description, tag} = req.body;
    // Create a newNote object
    const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}


        // Find the note to update it and then update it
        let note = await Note.findById(req.params.id)
        if(!note){
            res.status(404).send("Not found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed");
        }
        note  = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json(note);
  })

// Route 04: Delete an existing note for the user using DELETE "/api/notes/deletenote/:id" - Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        // Check if the note exists
        if (!note) {
            return res.status(404).send("Note not found");
        }
        // Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        // Delete the note
        await note.deleteOne();
        res.json({ success: "Note has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
