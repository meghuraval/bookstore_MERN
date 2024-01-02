import { createContext, useState } from "react";

// eslint-disable-next-line no-unused-vars
import React from "react";

export const BookContext = createContext();

// eslint-disable-next-line react/prop-types
export const BookProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAuthenticatedNavbar, setIsAuthenticatedNavbar] = useState(false);
  const [isSecondPasswordCorrect, setIsSecondPasswordCorrect] =
    useState(undefined);

  const toggleCardExpansion = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  const setAuthenticationStatus = (status) => {
    setIsAuthenticatedNavbar(status);
  };

  const setUserDataInfo = (data) => {
    setUserData(data);
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
        isAuthenticatedNavbar,
        setIsAuthenticatedNavbar,
        setAuthenticationStatus,
        isSecondPasswordCorrect,
        setIsSecondPasswordCorrect,
        userData,
        setUserData,
        setUserDataInfo,
        userId,
        setUserId,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
