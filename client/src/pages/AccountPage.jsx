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

      await axios.delete(`http://localhost:3000/user/${userId}`);

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
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
        `http://localhost:3000/user/userdetails/${userId}`,
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

      await axios.put(`http://localhost:3000/user/${userId}`, editedUserData, {
        headers: headers,
        auth: {
          username: email,
          password: password,
        },
      });

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
      <h1 className="text-center mb-5 font-semibold">Account Details</h1>
      {userDetails && (
        <div>
          <p>
            Username:{" "}
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
          <p>
            Email:{" "}
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
          <p>Password: {userDetails.password}</p>
        </div>
      )}
      {successMessage ?? <p>{successMessage}</p>}
      {errorMessage ?? <p>{errorMessage}</p>}
      <button
        className="flex m-auto bg-blue-500 text-white rounded-lg py-2 px-2 hover:scale-105"
        onClick={isEditing ? handleDoneEditing : handleEditClick}
      >
        {isEditing ? "Done Updating 👍" : "Update ✍️"}
      </button>
      <button
        onClick={handleSignOut}
        className="flex m-auto bg-red-500 text-white rounded-lg py-2 px-2 hover:scale-105 mt-5"
      >
        Sign out ✌️
      </button>
      <button
        onClick={deleteUser}
        className="flex m-auto bg-red-500 text-white rounded-lg py-2 px-2 hover:scale-105 mt-5"
      >
        Delete Account 😭
      </button>
    </div>
  );
}
