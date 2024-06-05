import React from "react";
import NoteContext from "../context/notes/noteCOntext";
import { useContext } from "react";

const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context;
  const { notes, updateNote } = props;
  return (
    <div className=" col-md-3">
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title"> {notes.title}</h5>
          <p class="card-text"> {notes.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui repellat voluptatum beatae. Corrupti, amet eius veniam praesentium quam ullam error possimus tempore suscipit soluta doloremque vel, blanditiis sint voluptas inventore minus iusto nisi delectus!</p>
          <i class="fa-solid fa-trash mx-2" onClick = {()=>{deleteNote(notes._id)}}></i>
          <i class="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(notes)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
