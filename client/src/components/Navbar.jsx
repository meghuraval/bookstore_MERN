// eslint-disable-next-line no-unused-vars
import React from "react";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row">
      <div>
        <Link to="/Homepage">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a3ec529632909.55fc107b84b8c.png"
            className="h-[80px] w-[120px] cursor-pointer"
          />
        </Link>
      </div>
      <ul className="flex ml-auto pr-5 mt-8 space-x-10 font-semibold cursor-pointer">
        <Link to="/Homepage">
          <li className="hover:text-red-600 transition duration-200">
            Home Page
          </li>
        </Link>
        <Link to="/Allbooks">
          <li className="hover:text-red-600 transition duration-200">
            All Books
          </li>
        </Link>
        <Link to="/SignIn">
          <li className="hover:text-red-600 transition duration-200">
            Sign In
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
