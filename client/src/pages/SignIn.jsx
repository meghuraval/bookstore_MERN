/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { BookContext } from "../utils/context/BookContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
      const response = await axios.post(
        "https://bookstore-mern-1hjk.onrender.com/user/signin",
        {
          email,
          password,
        }
      );

      const { token, _id, userName } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("userId", _id);
      localStorage.setItem("userName", userName);

      setAuthenticationStatus(true);
      console.log(response.data);
      navigate("/AllBooks");
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
      <h1 className="text-3xl text-center mb-10">Sign In</h1>
      <form onSubmit={(e) => e.preventDefault()}>
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
        {errorMessage && (
          <p className="bg-red-500 text-white mb-4 text-center">
            {errorMessage}
          </p>
        )}
        <div>
          <button
            className="flex m-auto bg-blue-500 py-3 px-3 rounded-lg text-white hover:scale-105 transition duration-200"
            type="submit"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="ml-[180px] mt-10">
        Dont have an account?{" "}
        <strong
          onClick={redirectToSignUp}
          className="hover:underline cursor-pointer text-blue-500"
        >
          Sign Up
        </strong>
      </p>
    </div>
  );
};

export default SignIn;
