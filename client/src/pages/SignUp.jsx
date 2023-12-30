/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleReEnterPasswordChange = (e) => {
    setReEnterPassword(e.target.value);
  };

  const handleSignUp = () => {
    // Validation logic to check if passwords match, email format, etc.
    if (password !== reEnterPassword) {
      alert("Passwords don't match");
      return;
    }
    // Further sign-up logic using email, password, and username
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Username:", username);
    // Add your sign-up logic here (e.g., API call, user registration)
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Re-enter Password:</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={reEnterPassword}
            onChange={handleReEnterPasswordChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
