import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexApi/authContext";
import { FaEye, FaEyeSlash,FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const SignupPage = () => {
  const navigate = useNavigate();

  // State variables to hold form input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility state
  const [error, setError] = useState(""); // Error state
  const { signupTokenManager } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const signupSumbitHandler = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the signup endpoint
      setIsLoading(true)
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });
      console.log("response", response);
      const signupToken = "signupToken"; // Replace with actual token if needed
      // Set cookies token
      setIsLoading(false)

      signupTokenManager(signupToken);

      // Navigate to the verification page
      navigate(`/verification?email=${email}&username=${username}`);

    } catch (error) {
      console.error("Signup failed:", error.response.data.msg);
      setIsLoading(false)
      if("OTP already sent. Please verify OTP")

      setError(error.response.data.msg); // Display error message
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <button className="bg-gray-100 border rounded-xl hover:bg-slate-700 hover:text-white h-10 px-6 ml-5 py-1 mt-2 mix-blend-plus-darker border-black">
          <Link to="/">Home</Link>
        </button>
      </div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Sign up for dream job
              </h1>
              <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                    <FcGoogle  className=" text-2xl"/>
                    </div>
                    <span className="ml-4">Log In with Google</span>
                  </button>
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                    <div className="bg-white p-1 rounded-full">
                    <FaGithub className="text-2xl" />
                    </div>
                    <span className="ml-4">Log In with GitHub</span>
                  </button>
                </div>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with e-mail
                  </div>
                </div>
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="UserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoFocus
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="relative">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-10"
                    >
                      {passwordVisible ? (
                     <FaEye/>
                      ) : (
                      <FaEyeSlash></FaEyeSlash>
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-red-600 text-center">{error}</p>
                  )}
                  <button
                    onClick={signupSumbitHandler}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    {
                      isLoading? (
<div className=" border-4 rounded-full  animate-spin flex justify-center border-l-slate-500 w-5 h-5"></div> 
                      ) : (
                        <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      )
                    }
                   
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by templatana's
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href="#"
                      className="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>
                  <div className="mt-5 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        Log In
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
