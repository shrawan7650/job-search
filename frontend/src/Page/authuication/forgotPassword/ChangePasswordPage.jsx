import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdLockReset } from "react-icons/md";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const query = useQuery();
  const email = query.get("email");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous error messages

    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      otp: formData.get("otp"),
      newPassword: formData.get("new-password"),
      confirmPassword: formData.get("confirm-password"),
    };

    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true); // Show loading spinner while changing password
      const response = await axios.post('/api/users/change-password', data);
      setIsLoading(false)
      console.log(response.data);
      navigate("/");
    } catch (error) {
      setIsLoading(false) // Hide loading spinner after changing password
      console.error("Error:", error);
      setError(error.response?.data?.msg );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <div className="text-center">
          <h3 className="text-3xl mb-4">
            <i className="fa fa-envelope fa-4x" />
          </h3>
          <h2 className="text-2xl mb-2">Change Password</h2>
          <p className="mb-6 text-gray-600">We will send you an OTP to verify your email.</p>
        </div>
        <form id="change-password-form" onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <div className="relative">
            <input
              id="email"
              name="email"
              placeholder="Email Address"
              type="email"
              required
              value={email}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <input
              id="otp"
              name="otp"
              placeholder="OTP"
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <input
              id="new-password"
              name="new-password"
              placeholder="New Password"
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="relative">
            <input
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >{
            isLoading?  
              <div className=" border-4 rounded-full  animate-spin flex justify-center border-l-slate-500 w-5 h-5"></div> : <MdLockReset />
          }
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
    