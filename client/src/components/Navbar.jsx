// eslint-disable-next-line no-unused-vars
import React from "react";
import "tailwindcss/tailwind.css";

const Navbar = () => {
  return (
    <div className="flex flex-row">
      <div>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a3ec529632909.55fc107b84b8c.png"
          className="h-[80px] w-[120px] cursor-pointer"
        />
      </div>
      <ul className="flex ml-auto pr-9 mt-8 space-x-10 font-semibold cursor-pointer">
        <li className="hover:text-red-600">Home</li>
        <li className="hover:text-red-600">About</li>
        <li className="hover:text-red-600">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
