// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { BookContext } from "../utils/context/BookContext";
import "../App.css";

export default function AddBookPage() {
  const fileInputRef = useRef(null);
  const { setSuccessMessage, setErrorMessage, successMessage, errorMessage } =
    useContext(BookContext);

  const MAX_CHARACTERS = 500;
  const [remainingCharacters, setRemainingCharacters] =
    useState(MAX_CHARACTERS);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    picture: null,
    addedBy: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      const pictureFile = files[0];
      setFormData((prevState) => ({
        ...prevState,
        picture: pictureFile,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (name === "description" && value.length <= MAX_CHARACTERS) {
      setRemainingCharacters(MAX_CHARACTERS - value.length);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log("user id: " + userId);
      setFormData((prevState) => ({
        ...prevState,
        addedBy: userId,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit fxn is triggered");
    const userId = localStorage.getItem("userId");
    const uploadedByUsername = localStorage.getItem("userName");
    console.log(uploadedByUsername);
    setFormData((prevState) => ({
      ...prevState,
      uploadedByUsername: uploadedByUsername,
    }));
    const { title, author, description, picture, price } = formData;

    const newBookData = new FormData();
    newBookData.append("title", title);
    newBookData.append("author", author);
    newBookData.append("description", description);
    newBookData.append("price", price);
    newBookData.append("picture", picture);
    newBookData.append("userId", userId);
    newBookData.append("uploadedByUsername", uploadedByUsername);
    try {
      const response = await axios.post(
        "https://bookstore-mern-1hjk.onrender.com/books/add",
        newBookData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("uploadedByUsername", uploadedByUsername);
      console.log("Book added successfully:", response.data);
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);

      setFormData((prevState) => ({
        ...prevState,
        title: "",
        author: "",
        description: "",
        price: "",
      }));
      resetFileInput();
    } catch (error) {
      console.error("Error adding book:", error);
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(false);
      setSuccessMessage(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setErrorMessage, setSuccessMessage]);

  return (
    <div
      style={{ fontFamily: "'Roboto', sans-serif" }}
      className="bg-blue-400 min-h-screen"
    >
      <div>
        <div className="flex flex-col">
          <h1
            style={{ fontFamily: "'Roboto', sans-serif" }}
            className="font-semibold text-center mt-7 text-3xl text-white"
          >
            Add Book
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-10">
              <label
                style={{ fontFamily: "'Roboto', sans-serif" }}
                className="flex justify-center"
              >
                Title:
              </label>
              <br />
              <input
                style={{ fontFamily: "'Roboto', sans-serif" }}
                className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 mt-5 outline-none"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-10 mb-10">
              <label className="flex justify-center">Author:</label>
              <br />
              <input
                className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 outline-none"
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-10 mb-10">
              <label className="flex justify-center mb-4">Selling Price:</label>
              <br />
              <input
                className="flex m-auto border border-e-gray-500 w-[400px] h-[30px] pl-3 mb-5 outline-none"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-[70px] h-[250px]">
              <label className="flex justify-center">Description:</label>
              <br />
              <textarea
                className="flex m-auto border border-e-gray-500 pl-3 mb-5 outline-none w-[500px] h-[210px]"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={MAX_CHARACTERS}
                required
              ></textarea>
              <p className="text-center text-sm">
                {remainingCharacters} characters remaining
              </p>
            </div>
            <div className="">
              <label className="flex justify-center">Picture:</label>
              <br />
              <input
                className="flex m-auto pl-3 mb-5 outline-none"
                type="file"
                accept="image/*"
                name="picture"
                onChange={handleChange}
                ref={fileInputRef}
                required
              />
            </div>
            {errorMessage && (
              <p className="bg-red-600 py-1 text-center mt-3 text-white">
                Failed to add book at this time, please try again later
              </p>
            )}
            {successMessage && (
              <p className="bg-green-600 py-1 text-center mt-3 text-white">
                Successfully added book
              </p>
            )}
            <button
              type="submit"
              className="flex m-auto bg-blue-500 py-3 px-3 rounded-lg text-white hover:scale-105 transition duration-200 mb-5 mt-10"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
