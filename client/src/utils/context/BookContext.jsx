import { createContext, useState } from "react";

// eslint-disable-next-line no-unused-vars
import React from "react";

export const BookContext = createContext();

// eslint-disable-next-line react/prop-types
export const BookProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <BookContext.Provider
      value={{
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
