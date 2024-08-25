import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GrPowerReset } from "react-icons/gr";
export const SendEmailPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    try {
      setIsLoading(true);

      const response = await axios.post("/api/users/forgot-password", {
        email,
      });
      setIsLoading(false);
      console.log("Email sent successfully:", response.data);
      navigate(`/verification-otp?email=${email}`);
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending email:", error);
      setError(error.response?.data?.msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <div className="text-center">
          <h3 className="text-4xl mb-4">
            <i className="fa fa-lock fa-4x" />
          </h3>
          <h2 className="text-2xl mb-2">Forgot Password?</h2>
          <p className="mb-6 text-gray-600">
            You can reset your password here.
          </p>
        </div>
        <form
          id="register-form"
          onSubmit={handleSubmit}
          autoComplete="off"
          className="space-y-4"
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="relative">
            <input
              id="email"
              name="email"
              placeholder="Email Address"
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white flex justify-center items-center py-3 gap-2  rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? (
              <div className=" border-4 rounded-full  animate-spin flex justify-center border-l-slate-500 w-5 h-5"></div>
            ) : (
              <GrPowerReset />
            )}
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
