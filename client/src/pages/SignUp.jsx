/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../utils/context/BookContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const {
    isSecondPasswordCorrect,
    setIsSecondPasswordCorrect,
    successMessage,
    setSuccessMessage,
  } = useContext(BookContext);

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

  const handleSignUp = async (e) => {
    if (password !== reEnterPassword) {
      console.log("Passwords do not match");
      setIsSecondPasswordCorrect(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/createuser",
        {
          email,
          username,
          password,
          reEnterPassword,
        }
      );
      navigate("/SignIn");
      console.log("new user created", response.data);
    } catch (error) {
      console.log("failed to create user:", error.response.data);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label>Re-enter Password:</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={reEnterPassword}
            onChange={handleReEnterPasswordChange}
            required
          />
        </div>
        {isSecondPasswordCorrect === false ? (
          <p>The passwords do not match</p>
        ) : (
          ""
        )}
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
