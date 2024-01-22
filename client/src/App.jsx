import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import NavBarSignedIn from "./components/NavBarSignedIn";
import AllBooksPage from "./pages/AllBooksPage";
import AddBooksPage from "./pages/AddBookPage";
import HomePage from "./pages/HomePage";
import { SignIn } from "./pages/SignIn";
import { useContext } from "react";
import AccountPage from "./pages/AccountPage";
import MyBooksPage from "./pages/MyBooksPage";
import { BookContext } from "./utils/context/BookContext";
import SignUp from "./pages/SignUp";
import BuyNow from "./pages/BuyNow";
import PaymentPage from "./pages/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OUu4XDMoIHzK9O3k2PcryNrjUuBfeiw6WzhGhYghmxyCf92nkyib8Cs4Um1wRsZ8HBiDuUsj1eVKllgBd2mf2w200XVlZPKEm"
);

function App() {
  const { isAuthenticatedNavbar } = useContext(BookContext);

  return (
    <div>
      <Router>
        {isAuthenticatedNavbar ? <NavBarSignedIn /> : <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/Allbooks" element={<AllBooksPage />} />
          <Route path="/Addbook" element={<AddBooksPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/AccountPage" element={<AccountPage />} />
          <Route path="/MyBooksPage" element={<MyBooksPage />} />
          <Route path="/BuyNow" element={<BuyNow />} />
          <Route
            path="/PaymentPage"
            element={
              <Elements stripe={stripePromise}>
                <PaymentPage />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//make sure to put components inside or src folder when installing tailwind or else tailwind will not work
