import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteCOntext';


function About() {
  const a = useContext(noteContext)
  useEffect(()=>{
    a.update()
    // eslint-disable-next-line
  },[])
  return (
    <div>

      <h1>This is about {a.state.name} who is in class {a.state.class}</h1>
    </div>
  );
}

export default About;
