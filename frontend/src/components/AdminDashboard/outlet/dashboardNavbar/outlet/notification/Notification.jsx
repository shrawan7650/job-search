import React from "react";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../../../../../contexApi/authContext";
import { IoMdClose } from "react-icons/io";
export const Notification = ({ openBell, setOpenBell }) => {
  return (
    <div>
      <button
        className="inline-flex items-center justify-center h-12 w-12 rounded-lg text-gray-400 hover:bg-gray-100 focus:bg-gray-100 focus:ring-1 focus:ring-gray-100"
        onClick={() => setOpenBell(!openBell)}
      >
        <FaBell />
      </button>
      <NotificationBox setOpenBell={setOpenBell} openBell={openBell} />
    </div>
  );
};

export const NotificationBox = ({ openBell, setOpenBell }) => {
  const { notificationAdmin, clearNotificationsAdmin } = useAuth();

  return (
    <>
      {openBell && (
        <div className="fixed md:-right-44  right-0 mt-2 max-w-xs min-h-[20rem]  w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4 z-50">
          <div className="bg-white relative  shadow-lg  rounded-lg max-w-[23rem]  h-full  overflow-y-auto ring-1 ring-gray-300">
            <div className="relative">
              <button
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                onClick={() => setOpenBell(false)}
              >
              <IoMdClose className=" text-2xl" />
              </button>
              <div className="p-4   right-0 ">
                <div id="messages">
                  {notificationAdmin.length > 0 ? (
                    notificationAdmin.map((item, index) => (
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
                    ))
                  ) : (
                    <p className="text-gray-600">No notifications</p>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    onClick={clearNotificationsAdmin}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
