import React, { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../../../contexApi/authContext";
import { Notification } from "./outlet/notification/Notification";
import logo from "../../../../assets/logo/our-portal-job-logo.png";
export const RightSideBarHeader = ({ panel, setPanel }) => {
  const [openBell, setOpenBell] = useState(false);
  const { notification, usersData } = useAuth();

  // Calculate unread notifications count
  const unreadCount =
    notification?.filter((item) => item.status === "unread").length || 0;

  return (
    <header className="flex items-center  dark:bg-gray-800 text-gray-700 border-b w-full h-20 px-6 sm:px-10 bg-white">
      <div className="flex mr-4 sm:mr-8 md:hidden">
        <button
          onClick={() => setPanel(!panel)}
          className="inline-flex items-center justify-center h-12 w-12 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:ring-1 focus:ring-gray-100"
        >
          <RiMenu3Fill className="text-2xl" />
        </button>
      </div>
      <div className="relative md:text-2xl text-sm  max-w-md sm:-ml-2">
       Admin Dashboard
      </div>
      <div className="flex ml-auto relative">
        <div className="relative">
          <Notification setOpenBell={setOpenBell} openBell={openBell} />
          {unreadCount > 0 && (
            <p className="absolute -top-1 right-2 border rounded-full text-white bg-red-500 px-2 text-xs">
              {unreadCount}
            </p>
          )}
        </div>
        <button className="inline-flex ml-2 items-center justify-center h-12 w-12 rounded-full text-gray-400 border hover:bg-gray-100 focus:bg-gray-100 focus:ring-1 focus:ring-gray-100">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={
              usersData?.avatarUrl ||
              "https://www.tailwind-kit.com/images/person/1.jpg"
            }
            alt="Your avatar"
          />
        </button>
      </div>
    </header>
  );
};
