import React, { useState } from 'react';
import { MdOutlineArrowDropDown } from "react-icons/md";
const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Newest to Oldest');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSortOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-42 inline-block z-20 text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sort by: {sortOption}
         
          <MdOutlineArrowDropDown  className={`text-2xl ${isOpen?"rotate-180":"rotate-0"}`}/>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => handleOptionClick('Newest to Oldest')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              Newest to Oldest
            </button>
            <button
              onClick={() => handleOptionClick('Oldest to Newest')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              Oldest to Newest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
