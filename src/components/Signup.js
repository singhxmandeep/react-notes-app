import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials; 
    if (credentials.password !== credentials.confirmPassword) { alert("Passwords do not match"); return; }
    const response = await fetch(`http://localhost:3001/api/auth/createUser`, {
        method: "POST", 
        headers: { "Content-Type": "application/json", }, 
        body: JSON.stringify({ name, email, password }), 
    });

    const json = await response.json();
    console.log(json);

    if (json.success) { 
      localStorage.setItem("token", json.authToken); 
      navigate("/");
      props.showAlert("Account Created Successfully", "success")
     } 
    else { props.showAlert("Invalid detials", "danger") }
  };

  const onChange = (e) => { setCredentials({ ...credentials, [e.target.name]: e.target.value }); };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" value={credentials.name} onChange={onChange} name="name" aria-describedby="nameHelp" />
      </div>
      <div>
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} minLength={5} required  name="email" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={credentials.password} minLength={5} required onChange={onChange} name="password" />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPassword" value={credentials.confirmPassword} onChange={onChange} name="confirmPassword" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Signup;
