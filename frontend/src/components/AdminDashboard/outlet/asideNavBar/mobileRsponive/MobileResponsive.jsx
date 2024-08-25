import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from "../../../../../contexApi/authContext";
import { CiSignpostR1, CiMedicalCross, CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiGrid2H } from "react-icons/ci";
import { FaCog, FaFolder } from "react-icons/fa";
import { MdDarkMode, MdKeyboardArrowDown } from "react-icons/md";
export const MobileResponsive = ({ panel, setPanel }) => {
  const { logout ,isDarkMode, setIsDarkMode} = useAuth();
  const [loading, setLoading] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  
  const toggleDarkMode = () => {
    handleLinkClick("mode");
    const newDarkMode = !isDarkMode;
  
    console.log("Toggling dark mode to:", newDarkMode);
  
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString()); // Save as string
    document.documentElement.classList.toggle("dark", newDarkMode);
  };
  

  const handleLinkClick = async (action) => {
    setLoading(action);
    try {
      // Simulate an async action
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPanel(!panel);
      // Simulated delay
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(""); // Reset the loading state after action
    }
  };
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  return (
    <>
      <aside
        className={`md:hidden block z-50 overflow-x-hidden fixed overflow-y-auto list-none top-16 duration-500 h-[100%] bg-gray-800 w-[80%] text-white ${
          !panel ? "left-[-100%] -top-0" : "left-[-2px] -top-0"
        }`}
      >
        <RxCross1
          onClick={() => setPanel(!panel)}
          className="absolute right-2 top-2 text-3xl"
        />
        <div className="flex-grow flex flex-col justify-between mt-10 text-gray-500">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <a
              onClick={() => handleLinkClick("profile")}
              href="#"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
            >
              {loading === "profile" ? (
                <div className="loader"></div> // Add your loader here
              ) : (
                <CgProfile className="text-xl" />
              )}
              <span className={`ml-2 `}>Profile</span>
            </a>

            <Link
              onClick={() => handleLinkClick("postJob")}
              to="/admin/dashboard/postJob"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
            >
              {loading === "postJob" ? (
                <div className="loader"></div> // Add your loader here
              ) : (
                <CiSignpostR1 className="text-xl" />
              )}
              <span className={`ml-2 `}>Post Job</span>
            </Link>

            <Link
              onClick={() => handleLinkClick("allJobs")}
              to="/admin/dashboard/allJobs"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
            >
              {loading === "allJobs" ? (
                <div className="loader"></div> // Add your loader here
              ) : (
                <CiGrid2H />
              )}
              <span className={`ml-2 `}>All Jobs</span>
            </Link>

            <Link
              onClick={() => handleLinkClick("myJobs")}
              to="/admin/dashboard/myJobs"
              className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
            >
              {loading === "myJobs" ? (
                <div className="loader"></div> // Add your loader here
              ) : (
                <CiMedicalCross />
              )}
              <span className={`ml-2 `}>My Jobs</span>
            </Link>
             <div className="relative">
              <button
                onClick={toggleSettings}
                className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              >
                <FaCog className="text-xl" />
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
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      {isDarkMode ? (
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
            <div className="flex flex-col ml-4">
              <button
                onClick={async () => {
                  setLoading("logout");
                  try {
                    await logout(); // Log out action
                  } catch (error) {
                    console.error("Error logging out:", error);
                  } finally {
                    setLoading("");
                  }
                }}
                className="inline-flex items-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg px-2"
              >
                {loading === "logout" ? (
                  <div className="loader"></div> // Add your loader here
                ) : (
                  <CiLogout className="text-xl" />
                )}
                <span className={`ml-2 `}>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
      {/* Add your CSS for the loader */}
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
