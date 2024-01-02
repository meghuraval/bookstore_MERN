/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useCallback, useState } from "react";
import axios from "axios";
import { BookContext } from "../utils/context/BookContext";

export default function AccountPage() {
  const { userData, setUserData } = useContext(BookContext);
  const [userDetails, setUserDetails] = useState({});
  const userId = localStorage.getItem("userId");

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

  return (
    <div>
      <h1>AccountPage</h1>
      {userDetails && (
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          {/* Displaying the password in plain text is not recommended for security reasons */}
          <p>Password: {userDetails.password}</p>
        </div>
      )}
    </div>
  );
}
