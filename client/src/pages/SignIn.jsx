/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    // Logic for sign-in using email and password
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your sign-in logic here (e.g., API call, authentication)
  };

  return (
    <div>
      <h1>Sign In</h1>
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
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
