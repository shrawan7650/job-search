import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiSignpostR1, CiMedicalCross, CiLogout } from "react-icons/ci";
import { CiGrid2H } from "react-icons/ci";
import { useAuth } from "../../../../../contexApi/authContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const LaptopResponsive = () => {
  const { logout, isDarkMode, setIsDarkMode } = useAuth();
  const [loading, setLoading] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLinkClick = async (action) => {
    setLoading(action); // Set the loading state based on the action
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(""); // Reset the loading state after action
    }
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    handleLinkClick("setting");
  };

  const toggleDarkMode = () => {
    handleLinkClick("mode");
    const newDarkMode = !isDarkMode;
  
    console.log("Toggling dark mode to:", newDarkMode);
  
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString()); // Save as string
    document.documentElement.classList.toggle("dark", newDarkMode);
  };
  

  return (
    <>
      <aside className="md:flex flex-col hidden bg-gray-800 min-w-52">
        <div className="flex-grow flex flex-col justify-between text-gray-500">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              onClick={() => handleLinkClick("home")}
            >
              {loading === "home" ? (
                <div className="loader"></div>
              ) : (
                <IoHomeSharp className="text-xl" />
              )}
              <span className="ml-2">Home</span>
            </Link>
            <Link
              to="/admin/dashboard/profile"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              onClick={() => handleLinkClick("profile")}
            >
              {loading === "profile" ? (
                <div className="loader"></div>
              ) : (
                <CgProfile className="text-xl" />
              )}
              <span className="ml-2">Profile</span>
            </Link>

            <Link
              to="/admin/dashboard/postJob"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              onClick={() => handleLinkClick("postJob")}
            >
              {loading === "postJob" ? (
                <div className="loader"></div>
              ) : (
                <CiSignpostR1 className="text-xl" />
              )}
              <span className="ml-2">Post Job</span>
            </Link>
            <Link
              to="/admin/dashboard/allJobs"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              onClick={() => handleLinkClick("allJobs")}
            >
              {loading === "allJobs" ? (
                <div className="loader"></div>
              ) : (
                <CiGrid2H className="text-xl" />
              )}
              <span className="ml-2">All Jobs</span>
            </Link>
            <Link
              to="/admin/dashboard/myJobs"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              onClick={() => handleLinkClick("myJobs")}
            >
              {loading === "myJobs" ? (
                <div className="loader"></div>
              ) : (
                <CiMedicalCross className="text-xl" />
              )}
              <span className="ml-2">My Jobs</span>
            </Link>
            <div className="relative">
              <button
                onClick={toggleSettings}
                className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              >
                {loading === "setting" ? (
                  <div className="loader"></div>
                ) : (
                  <FaCog className="text-xl" />
                )}
                <span className="ml-2">Settings</span>
                <MdKeyboardArrowDown
                  className={`ml-2 ${isSettingsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSettingsOpen && (
                <div className="mx-auto max-w-5xl p-4">
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-3 font-medium">
                    <button
                      onClick={toggleDarkMode}
                      className="flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      {loading === "mode" ? (
                        <div className="loader"></div>
                      ) : isDarkMode ? (
                        <CiLight className="text-xl" />
                      ) : (
                        <MdDarkMode className="text-xl" />
                      )}
                      <span className="ml-2">
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                      </span>
                    </button>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <button
                onClick={async () => {
                  setLoading("logout");
                  try {
                    await logout();
                  } catch (error) {
                    console.error("Error logging out:", error);
                  } finally {
                    setLoading("");
                  }
                }}
                className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              >
                {loading === "logout" ? (
                  <div className="loader"></div>
                ) : (
                  <CiLogout className="text-xl" />
                )}
                <span className="ml-2">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
      <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left: 4px solid #ffffff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default LaptopResponsive;
