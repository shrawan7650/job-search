import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../assets/logo/our-portal-job-logo.png";
import { useAuth } from "../../../contexApi/authContext";
import axios from "axios";
import { FaMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Freelance",
];

export const salaryRanges = [
  { label: "₹30,000 - ₹40,000", min: 30000, max: 40000 },
  { label: "₹40,000 - ₹50,000", min: 40000, max: 50000 },
  { label: "₹50,000 - ₹60,000", min: 50000, max: 60000 },
  { label: "₹60,000 - ₹70,000", min: 60000, max: 70000 },
  { label: "₹70,000 - ₹80,000", min: 70000, max: 80000 },
  { label: "₹80,000+", min: 80000, max: Infinity },
];

const SearchBar = ({
  searchTitle,
  setSearchTitle,
  searchLocation,
  setSearchLocation,
  selectedJobType,
  setSelectedJobType,
  selectedSalaryRange,
  setSelectedSalaryRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
 
  const { logout } = useAuth();
  const navigate = useNavigate();
  const relodWindowHandler = () => {
    window.location.reload(false);
  };
  const { clearNotificationUser,notificationUser } = useAuth();
 
console.log("ntification",notificationUser)
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <button onClick={relodWindowHandler}>
          <Link to="/user/dashboard">
            <img src={logo} className="w-16 h-10 cursor-pointer" alt="Logo" />
          </Link>
        </button>

        <div className="hidden md:flex items-center space-x-2 rounded-md">
          <i className="fas fa-search text-blue-500"></i>
          <input
            type="text"
            placeholder="Product Designer, UI Designer"
            className="bg-transparent border-2 rounded-md p-1 outline-none"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center space-x-2 rounded-md">
          <i className="fas fa-map-marker-alt text-blue-500"></i>
          <input
            type="text"
            placeholder="Location"
            className="bg-transparent border-2 rounded-md p-1 outline-none"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center space-x-2 rounded-md">
          <i className="fas fa-briefcase text-blue-500"></i>
          <select
            className="bg-transparent border rounded-md p-1 outline-none"
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
          >
            <option value="">Job Type</option>
            {jobTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex items-center space-x-2 rounded-md">
          <i className="fas fa-dollar-sign text-blue-500"></i>
          <select
            className="bg-transparent border rounded-md p-1 outline-none"
            value={selectedSalaryRange}
            onChange={(e) => setSelectedSalaryRange(e.target.value)}
          >
            <option value="">Salary Range</option>
            {salaryRanges.map((range, index) => (
              <option key={index} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="md:hidden">
          <FaBars
            className="text-blue-500 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          />
        </button>
       <div>
        <Link to="/user/dashboard/userMyJob" >My Job</Link>
       </div>
        <button
          className="relative"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
        >
          <FaBell className="text-blue-500 text-2xl" />
          {notificationsOpen && (
        <div className="fixed md:-right-44 right-0 mt-2 max-w-xs min-h-[20rem]  w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4 z-50">
          <div className="bg-white relativeb overflow-y-auto  no-scrollbar shadow-lg  rounded-lg max-w-[23rem]  max-h-[30rem] oring-1 ring-gray-300">
            <div className="relative overflow-y-auto ">
              <button
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                onClick={() => setOpenBell(false)}
              >
              <IoMdClose className=" text-2xl" />
              </button>
              <div className="p-4  right-0 ">
                <div id="messages" >
                  {notificationUser.length > 0 ? (
                    notificationUser.map((item, index) => (
                    <div >
                        <div
                        key={index}
                        className="flex items-start gap-x-4 p-3 hover:bg-gray-100 rounded-lg"
                      >
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                          <FaMessage className="text-xl text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {item.messageTitle}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.messageContent}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(item.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No notifications</p>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    onClick={clearNotificationUser}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </button>

        <div className="relative">
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="cursor-pointer"
          >
            <FaUserCircle className="text-blue-500 text-2xl" />
          </div>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <div className="py-2">
                <button
                  onClick={() => navigate("/user/dashboard/userprofile")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`md:hidden fixed top-0 -left-6 w-full md:w-[95%] bg-gray-600 text-white overflow-y-auto rounded-md min-h-screen duration-500 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl text-white"
        >
          <FaTimes />
        </button>

        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="search" className="block mb-2 text-lg font-medium">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                className="block w-full p-4 text-sm text-white border border-gray-300 rounded-lg bg-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by title, location, or salary..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Search
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">Job Type</label>
            <select
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-lg font-medium">
              Salary Range
            </label>
            <select
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSalaryRange}
              onChange={(e) => setSelectedSalaryRange(e.target.value)}
            >
              <option value="">Select Salary Range</option>
              {salaryRanges.map((range, index) => (
                <option key={index} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
