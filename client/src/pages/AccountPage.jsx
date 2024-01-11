/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useCallback, useState } from "react";
import axios from "axios";
import { BookContext } from "../utils/context/BookContext";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const navigate = useNavigate();
  const {
    userData,
    setUserData,
    setSuccessMessage,
    setErrorMessage,
    successMessage,
    errorMessage,
    setIsAuthenticatedNavbar,
  } = useContext(BookContext);
  const [userDetails, setUserDetails] = useState({});
  const userId = localStorage.getItem("userId");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const deleteUser = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("user id not found");
        return;
      }

      await axios.delete(
        `https://bookstore-mern-1hjk.onrender.com/user/${userId}`
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("userName");
      setIsAuthenticatedNavbar(false);
      navigate("/SignIn");
      console.log("Deleted user successfully");
    } catch (error) {
      console.log("Error Deleting User:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("uploadedByUsername");
    setUserData(null);
    navigate("/SignIn");
    setIsAuthenticatedNavbar(false);
  };

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      if (!token || !email || !password || !userId) {
        console.error(
          "Token, email, userId or password not found in local storage"
        );
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `https://bookstore-mern-1hjk.onrender.com/user/userdetails/${userId}`,
        {
          headers: headers,
          auth: {
            username: email,
            password: password,
          },
        }
      );

      setUserData(response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [setUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditedUserData({ ...userDetails });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDoneEditing = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const usernameChanged = editedUserData.username !== userDetails.username;
      const emailChanged = editedUserData.email !== userDetails.email;
      const passwordChanged = editedUserData.password !== userDetails.password;

      if (!usernameChanged && !emailChanged && !passwordChanged) {
        console.log("No changes made to user data");
        setIsEditing(false);
        setErrorMessage("No changes made to user data");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        // Show a message that no changes were made
        return;
      }

      await axios.put(
        `https://bookstore-mern-1hjk.onrender.com/user/${userId}`,
        editedUserData,
        {
          headers: headers,
          auth: {
            username: email,
            password: password,
          },
        }
      );

      setIsEditing(false);
      fetchUserData();
      setSuccessMessage("Account details updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log("Error updating user data");
    }
  };

  return (
    <div>
      <h1 className="text-center mb-16 font-semibold text-3xl mt-5">
        Account Details
      </h1>
      {userDetails && (
        <div>
          <p className="flex justify-center mb-4">Username: </p>
          <p className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none">
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editedUserData.username}
                onChange={handleInputChange}
              />
            ) : (
              userDetails.username
            )}
          </p>
          <p className="flex justify-center mb-4">Email: </p>
          <p className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedUserData.email}
                onChange={handleInputChange}
              />
            ) : (
              userDetails.email
            )}
          </p>
          {/* Displaying the password in plain text is not recommended for security reasons */}
          <p className="flex justify-center mb-4">Password: </p>
          <p className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none">
            {userDetails.password}
          </p>
        </div>
      )}
      {successMessage ?? <p className="text-center">{successMessage}</p>}
      {errorMessage ?? <p className="text-center">{errorMessage}</p>}
      <div className="flex flex-row ml-10">
        <button
          className="flex m-auto text-blue-500 py-2 px-2 border rounded-lg border-blue-500 hover:scale-105 mt-5"
          onClick={isEditing ? handleDoneEditing : handleEditClick}
        >
          {isEditing ? "Done Updating" : "Update"}
        </button>
        <button
          onClick={handleSignOut}
          className="flex m-auto text-blue-500 py-2 px-2 border rounded-lg border-blue-500 hover:scale-105 mt-5"
        >
          Sign out
        </button>
        <button
          onClick={deleteUser}
          className="flex m-auto bg-red-500 rounded-lg text-white py-2 px-2 hover:scale-105 mt-5"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
