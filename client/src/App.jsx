import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AllBooksPage from "./pages/AllBooksPage";
import AddBooksPage from "./pages/AddBookPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/Allbooks" element={<AllBooksPage />} />
          <Route path="/Addbook" element={<AddBooksPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//make sure to put components inside or src folder when installing tailwind or else tailwind will not work
