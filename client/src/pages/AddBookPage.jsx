// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";

export default function AddBookPage() {
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
    const { title, author, description, picture } = formData;

    const newBookData = new FormData();
    newBookData.append("title", title);
    newBookData.append("author", author);
    newBookData.append("description", description);
    newBookData.append("picture", picture);

    console.log("handle submit fxn is triggered part 2");

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
      // You can perform further actions here after successful book addition
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle errors here
    }
  };

  return (
    <div className="bg-slate-500 h-screen">
      <div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-center mt-10 text-3xl">Add Book</h1>
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
              />
            </div>
            <button
              type="submit"
              className="bg-slate-600 rounded-md h-10 w-20 ml-[45%] mt-20 text-white hover:scale-105"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
