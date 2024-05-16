
  import React, { useState } from "react";
  import "./login.css";
  import { useNavigate } from "react-router-dom";
  import axios from "axios"; // Import Axios

  const LoginPage = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const Navigate = useNavigate();

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);

      axios
        .post("http://localhost:5000/users/login", formData) 
        .then((response) => {
          console.log(response.data); 
          localStorage.setItem("chattoken",response.data.token);
          Navigate('/chat')
        })
        .catch((error) => console.error("Error:", error));
    };

    return (
      <div className="container">
        <h1>Welcome to Chat App</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" id="loginBtn">
            Login
          </button>
        </form>
        <button id="signupBtn" onClick={() => Navigate("/signUp")}>
          Sign Up
        </button>
      </div>
    );
  };

  export default LoginPage;
    

