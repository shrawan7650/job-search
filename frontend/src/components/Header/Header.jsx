import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-5 sm:px-10 lg:px-20  py-4 md:py-5 w-full flex items-center justify-between bg-white shadow-md md:shadow-none md:bg-transparent border-b-2 md:border-none">
      <div className="flex  justify-between w-full">
        <div className="flex items-center space-x-4">
          <a
            href="#blog"
            className="transition-all duration-100 ease-in-out pb-1 border-b-2 text-indigo-500 border-transparent hover:border-indigo-300 hover:text-gray-600 text-lg md:text-sm font-bold tracking-wide"
          >
            Blog
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="transition-all duration-100 ease-in-out pb-1 border-b-2 text-indigo-500 border-transparent hover:border-indigo-300 hover:text-indigo-600 text-lg md:text-sm font-bold tracking-wide"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border border-transparent rounded font-semibold tracking-wide text-lg md:text-sm px-5 py-2 bg-indigo-600 text-gray-100 hover:bg-indigo-800 hover:text-gray-200 transition-all duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
