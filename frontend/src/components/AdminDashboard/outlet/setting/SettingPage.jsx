// // Settings.jsx
// import React, { useState } from 'react';
// import { MdDarkMode } from 'react-icons/md';
// import { CiLight } from 'react-icons/ci';
// import { FaCog, FaFolder } from "react-icons/fa";
// const Settings = () => {
//   const [isDarkMode, setIsDarkMode] = useState(
//     localStorage.getItem('darkMode') === 'true'
//   );
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode(prevMode => !prevMode);
//     localStorage.setItem('darkMode', !isDarkMode);
//     document.documentElement.classList.toggle('dark', !isDarkMode);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
//       >
//         <FaCog />
//         <span className="ml-2">Settings</span>
//       </button>
//       {isDropdownOpen && (
//         <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
//           <button
//             onClick={toggleDarkMode}
//             className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             {isDarkMode ? <CiLight className="text-xl" /> : <MdDarkMode className="text-xl" />}
//             <span className="ml-2">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//           </button>
//           {/* Add more settings options here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;
