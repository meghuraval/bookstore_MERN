import { createContext, useState } from "react";

// eslint-disable-next-line no-unused-vars
import React from "react";

export const BookContext = createContext();

// eslint-disable-next-line react/prop-types
export const BookProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleCardExpansion = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  return (
    <BookContext.Provider
      value={{
        successMessage,
        setSuccessMessage,
        errorMessage,
        setErrorMessage,
        isCardExpanded,
        setIsCardExpanded,
        toggleCardExpansion,
        selectedCard,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
