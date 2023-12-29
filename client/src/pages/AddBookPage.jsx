// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BookContext } from "../utils/context/BookContext";

export default function AddBookPage() {
  const { setSuccessMessage, setErrorMessage, successMessage, errorMessage } =
    useContext(BookContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    picture: null,
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit fxn is triggered");
    const { title, author, description, picture, price } = formData;

    const newBookData = new FormData();
    newBookData.append("title", title);
    newBookData.append("author", author);
    newBookData.append("description", description);
    newBookData.append("price", price);
    newBookData.append("picture", picture);

    try {
      const response = await axios.post(
        "http://localhost:3000/books/add",
        newBookData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Book added successfully:", response.data);
      setSuccessMessage(true);

      setFormData({
        title: "",
        author: "",
        description: "",
        price: "",
        picture: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(false);
      setSuccessMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setErrorMessage, setSuccessMessage]);

  return (
    <div className="bg-slate-500 h-screen">
      <div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-center mt-7 text-3xl">Add Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-10">
              <label className="ml-10">Title:</label>
              <br />
              <input
                className="ml-10 mt-5 w-[40%]"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-10 mb-10">
              <label className="ml-10">Author:</label>
              <br />
              <input
                className="ml-10 mt-5 w-[40%]"
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-10 mb-10">
              <label className="ml-10">Selling Price:</label>
              <br />
              <input
                className="ml-10 mt-5 w-[40%]"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-10 h-[250px]">
              <label className="ml-10 w-[40]">Description:</label>
              <br />
              <textarea
                className="ml-10 mt-5 w-[80%] h-[230px]"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label className="ml-10">Picture:</label>
              <br />
              <input
                className="ml-10 mr-5 mt-5"
                type="file"
                accept="image/*"
                name="picture"
                onChange={handleChange}
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
                Succesfully added book
              </p>
            )}
            <button
              type="submit"
              className="bg-slate-600 rounded-md h-10 w-20 ml-[45%] mt-[5%] text-white hover:scale-105"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
