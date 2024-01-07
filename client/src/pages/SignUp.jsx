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
      <h1 className="text-3xl text-center mb-10">Sign Up</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="flex justify-center mb-4">Username:</label>
          <input
            className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label className="flex justify-center mb-4">Email:</label>
          <input
            className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label className="flex justify-center mb-4">Password:</label>
          <input
            className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label className="flex justify-center mb-4">Re-enter Password:</label>
          <input
            className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none"
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
          <button
            className="flex m-auto bg-blue-500 py-3 px-3 rounded-lg text-white hover:scale-105 transition duration-200"
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
