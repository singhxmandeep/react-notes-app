// About.js
import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About Our Note-Taking Website</h2>
        <p>
          Welcome to our note-taking website! Our platform is designed to help you organize your thoughts, ideas, tasks, and anything else you need to remember in a simple and effective way.
        </p>
        <p>
          With our intuitive interface, you can create, edit, and organize notes effortlessly. Whether you're a student, professional, or anyone looking to stay organized, our website provides the tools you need.
        </p>
        <p>
          Features include:
          <ul>
            <li>Creating and editing notes in a distraction-free environment.</li>
            <li>Organizing notes into categories or folders for easy access.</li>
            <li>Searching notes quickly with our powerful search functionality.</li>
            <li>Syncing notes across devices so you can access them anytime, anywhere.</li>
            <li>Customizing the look and feel of your notes with rich text formatting.</li>
          </ul>
        </p>
        <p>
          Whether you're jotting down ideas, keeping track of tasks, or collaborating with others, our note-taking website is here to simplify your life and enhance your productivity.
        </p>
      </div>
    </div>
  );
};

export default About;
