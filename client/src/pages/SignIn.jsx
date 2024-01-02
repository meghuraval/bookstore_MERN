/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { BookContext } from "../utils/context/BookContext";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage, setAuthenticationStatus } =
    useContext(BookContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectToSignUp = () => {
    navigate("/SignUp");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        email,
        password,
      });

      const { token, _id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("userId", _id);

      setAuthenticationStatus(true);
      console.log(response.data);
      navigate("/Homepage");
      // Add further logic based on the successful sign-in if needed
    } catch (error) {
      console.log("Sign in error: " + error.response.data.error);
      setErrorMessage("Failed to sign in");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
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
        {errorMessage && (
          <p className="bg-red-500 text-white">{errorMessage}</p>
        )}
        <div>
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </form>
      <p>
        Dont have an account?{" "}
        <strong
          onClick={redirectToSignUp}
          className="hover:underline cursor-pointer"
        >
          Sign Up
        </strong>
      </p>
    </div>
  );
};
