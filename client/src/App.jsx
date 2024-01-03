import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import NavBarSignedIn from "./components/NavBarSignedIn";
import AllBooksPage from "./pages/AllBooksPage";
import AddBooksPage from "./pages/AddBookPage";
import HomePage from "./pages/HomePage";
import { SignIn } from "./pages/Signin";
import { useContext } from "react";
import AccountPage from "./pages/AccountPage";
import MyBooksPage from "./pages/MyBooksPage";
import { BookContext } from "./utils/context/BookContext";
import SignUp from "./pages/SignUp";

function App() {
  const { isAuthenticatedNavbar } = useContext(BookContext);

  return (
    <div>
      <Router>
        {isAuthenticatedNavbar ? <NavBarSignedIn /> : <Navbar />}
        <Routes>
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/Allbooks" element={<AllBooksPage />} />
          <Route path="/Addbook" element={<AddBooksPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AccountPage" element={<AccountPage />} />
          <Route path="/MyBooksPage" element={<MyBooksPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//make sure to put components inside or src folder when installing tailwind or else tailwind will not work
