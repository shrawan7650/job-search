import React, { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "../../../contexApi/authContext";
import { jobNiches } from "../../../store/nichesData";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VerificationPage = () => {
  const { tokenManager, signupTokenClearManager } = useAuth();
  const navigate = useNavigate();
  const signupToken = Cookies.get("signupToken");
  const query = useQuery();
  const emailFromQuery = query.get("email");
  const usernameFromQuery = query.get("username")
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(emailFromQuery || "");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [previewResume, setPreviewResume] = useState(null);
  const [username, setUsername] = useState(usernameFromQuery||"");
  const [role, setRole] = useState("user");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  // Refs for OTP inputs
  const otpRefs = useRef([]);

  const handleChange = (e, index) => {
    const { id, value } = e.target;
    if (id.startsWith("otp-")) {
      const newOtp = [...otp];
      newOtp[parseInt(id.split("-")[1])] = value.replace(/\D/, ""); // Only allow digits
      setOtp(newOtp);

      // Auto-focus the next input
      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      } else if (!value && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    } else {
      switch (id) {
        case "name":
          setName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "username":
          setUsername(value);
          break;
        case "role":
          setRole("user");
          break;
        case "city":
          setCity(value);
          break;
        case "state":
          setState(value);
          break;
        case "phoneNumber":
          setPhoneNumber(value);
          break;
        case "firstNiche":
          setFirstNiche(value);
          break;
        case "secondNiche":
          setSecondNiche(value);
          break;
        case "thirdNiche":
          setThirdNiche(value);
          break;
        case "coverLetter":
          setCoverLetter(value);
          break;
        default:
          break;
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.id === "resume-upload") {
      setResume(file);
      setPreviewResume(file.name);
    } else {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setPreviewImage(null);
    document.getElementById("file-upload").value = ""; // Clear file input
  };

  const handleCancelResume = () => {
    setResume(null);
    setPreviewResume(null);
    document.getElementById("resume-upload").value = ""; // Clear file input
  };

  const verifySignupHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("phoneNumber", phoneNumber);
    formData.append("otp", otp.join(""));
    if (image) formData.append("avatar", image);
    formData.append("firstNiche", firstNiche);
    formData.append("secondNiche", secondNiche);
    formData.append("thirdNiche", thirdNiche);
    formData.append("coverLetter", coverLetter);
    if (resume) formData.append("resume", resume);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/verification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setIsLoading(false);
      tokenManager(response.data.token);
      navigate("/user/dashboard");
      signupTokenClearManager();
    } catch (error) {
      console.error("Verification failed", error);
      setIsLoading(false);
      setVerificationStatus(
        error.response?.data?.msg || "Verification failed. Please try again."
      );
    }
  };

  const logout = () => {
    Cookies.remove("signupToken");
    window.location.href = "/signup";
  };

  const resendOtpHandler = async () => {
    try {
      setIsResendingOtp(true);
      const response = await axios.post("/api/users/resend-otp", { email });
      console.log(response.data.message || "OTP resent successfully");
      setIsResendingOtp(false);
    } catch (error) {
      console.error("Failed to resend OTP", error);
      setIsResendingOtp(false);
      setVerificationStatus(
        error.response?.data?.msg || "Failed to resend OTP. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col w-full items-center min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="w-full sticky top-0 bg-white border-b border-gray-200 text-center py-1 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black ml-6">Dream Job</h1>
        <button
          onClick={logout}
          className="mt-1 py-1 px-6 bg-blue-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Welcome Section */}
      <div className="bg-white border shadow-md rounded-lg p-4 w-full text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
        <p className="text-gray-700 mb-2">Thanks for Joining Dream Job!</p>
        <p className="text-xl">Continue verification and become job-ready</p>
      </div>

      <div className="md:flex items-center md:justify-evenly w-full">
        {/* Profile Image Section */}
        <div className="flex flex-col border p-5 rounded-full h-fit w-fit items-center mb-4 md:mb-0">
          <label className="block mb-1 text-gray-700">Profile Image</label>
          {previewImage && (
            <div className="relative mb-4">
              <img
                src={previewImage}
                alt="Profile Preview"
                className="h-24 w-24 object-cover rounded-full"
              />
              <button
                type="button"
                onClick={handleCancelImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <RxCross2 size={15} />
              </button>
            </div>
          )}
          <div className="mt-2 flex items-center justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <FaUpload size={20} className="text-gray-700" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 bg-gray-100 p-4 rounded-lg">
          <div className="container mx-auto">
            <div className="bg-white rounded shadow px-8 py-12">
              <div className="flex flex-col mb-4 gap-4">
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="otp"
                  >
                    Enter OTP
                  </label>
                  <div className="flex space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        className="otp-input text-center w-12 py-2 border border-gray-300 rounded"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        ref={(el) => (otpRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={resendOtpHandler}
                    disabled={isResendingOtp}
                  >
                    {isResendingOtp ? "Resending..." : "Resend OTP"}
                  </button>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleChange}
                    readOnly
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <input
                    id="role"
                    value={role}
                    onChange={handleChange}
                    readOnly
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    
                  </input>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="state"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="firstNiche"
                  >
                    First Niche
                  </label>
                  <select
                    id="firstNiche"
                    value={firstNiche}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Niche</option>
                    {jobNiches.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="secondNiche"
                  >
                    Second Niche
                  </label>
                  <select
                    id="secondNiche"
                    value={secondNiche}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Niche</option>
                    {jobNiches.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="thirdNiche"
                  >
                    Third Niche
                  </label>
                  <select
                    id="thirdNiche"
                    value={thirdNiche}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Niche</option>
                    {jobNiches.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="coverLetter"
                  >
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md"
                    rows="4"
                  ></textarea>
                </div>
                <div className="w-full">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="resume-upload"
                  >
                    Resume
                  </label>
                  <div className="flex items-center justify-center mt-2 mb-4">
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FaUpload size={20} className="text-gray-700" />
                    </label>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  {previewResume && (
                    <div className="relative">
                      <p>{previewResume}</p>
                      <button
                        type="button"
                        onClick={handleCancelResume}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <RxCross2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {verificationStatus && (
                <p className="text-red-500 text-center mb-4">
                  {verificationStatus}
                </p>
              )}
              <div className="flex justify-center mt-4">
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded"
                  onClick={verifySignupHandler}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Verify"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
