import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../../../contexApi/authContext";
import { FaEye, FaEyeSlash, FaCheck, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const navigate = useNavigate();
  const { tokenManager } = useAuth();
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("user"); // Default role

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginWithGoogle = () => {
    window.open("http://localhost:5173/auth/google/callback", "_self");
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", {
        email,
        password,
        role,
      });
      console.log("djgasa", response.data);
      setIsLoading(false);

      if (response.data.userResponse.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
      tokenManager(response.data.token);
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error.response?.data);
      setError(error.response?.data?.msg);
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
                Log in to your account
              </h1>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    onClick={loginWithGoogle}
                  >
                    <div className="bg-white p-2 rounded-full">
                      <FcGoogle className="text-2xl" />
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
                    Or log in with e-mail
                  </div>
                </div>
                <form onSubmit={loginSubmitHandler}>
                  <div className="mx-auto max-w-xs">
                    {error && (
                      <p className="text-red-500 text-center mb-4">{error}</p>
                    )}
                    <div className="mb-2 flex justify-center gap-5">
                      <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="admin"
                        checked={role === "admin"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label htmlFor="employee">Employee</label>
                      <input
                        type="radio"
                        id="user"
                        name="role"
                        value="user"
                        checked={role === "user"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label htmlFor="seeker">Seeker</label>
                    </div>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="relative mt-5">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div
                        className="absolute top-5 inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      {isLoading ? (
                        <div className="border-4 rounded-full animate-spin flex justify-center border-l-slate-500 w-5 h-5"></div>
                      ) : (
                        <FaCheck className="text-sm text-blue-800" />
                      )}
                      <span className="ml-3">Log In</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by templatana's{" "}
                      <Link
                        to="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Terms of Service
                      </Link>{" "}
                      and its{" "}
                      <Link
                        to="#"
                        className="border-b border-gray-500 border-dotted"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </form>
                <div className="flex justify-evenly items-center mt-5">
                  <span className="ml-2">
                    New here?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-500 border-b border-gray-200 leading-5"
                    >
                      Register
                    </Link>
                  </span>
                  <span className="ml-2">
                    <Link
                      to="/forgot-password"
                      className="text-blue-500 border-b border-gray-200 leading-5"
                    >
                      Forgot Password?
                    </Link>
                  </span>
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
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
