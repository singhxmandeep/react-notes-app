import React, { useState, useEffect } from "react";
import NoteContext from "./noteCOntext";

const NoteState = (props) => {
  const host = "http://localhost:3001";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1N2JiMDZlMjkyNzE2OGExYWMwNTdhIn0sImlhdCI6MTcxNzAyNTk0Nn0.OLgfP3yPUWel9bnH7-flfVeo1hS_DTtNatx8IlxlZbs",
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1N2JiMDZlMjkyNzE2OGExYWMwNTdhIn0sImlhdCI6MTcxNzAyNTk0Nn0.OLgfP3yPUWel9bnH7-flfVeo1hS_DTtNatx8IlxlZbs",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1N2JiMDZlMjkyNzE2OGExYWMwNTdhIn0sImlhdCI6MTcxNzAyNTk0Nn0.OLgfP3yPUWel9bnH7-flfVeo1hS_DTtNatx8IlxlZbs",
      },
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1N2JiMDZlMjkyNzE2OGExYWMwNTdhIn0sImlhdCI6MTcxNzAyNTk0Nn0.OLgfP3yPUWel9bnH7-flfVeo1hS_DTtNatx8IlxlZbs",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json)

    const newNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    setNotes(newNotes);
  };

  // Fetch all notes when the component mounts
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
