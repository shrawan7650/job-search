import React from "react";
import { FcGoogle } from "react-icons/fc";
export const LoginGoogle = () => {
  return (
    <>
      <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
        <div className="bg-white p-2 rounded-full">
          <FcGoogle className=" text-2xl" />
        </div>
        {/* <span className="ml-4">Log In with Google</span> */}
        <a href="/auth/google">Login with Google</a>
      </button>
    </>
  );
};
