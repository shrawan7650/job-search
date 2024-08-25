import React, { useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaKey, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import moment from "moment";
import { useAuth } from "../../../../../contexApi/authContext";

const ProfileCard = ({ user, onProfileUpdate }) => {
  const {token} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [ischangePasswordLoading, setischangePasswordLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [image, setImage] = useState(user.image || "");
  const [username, setUsername] = useState(user.username || "");
  const [role, setRole] = useState(user.role || "");
  const [city, setCity] = useState(user.city || "");
  const [state, setState] = useState(user.state || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [createdAt, setCreatedAt] = useState(user.createdAt || "");
  const [updatedAt, setUpdatedAt] = useState(user.updatedAt || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview URL for the selected image
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setPreviewImage(null);
    document.getElementById('imageInput').value = ""; // Clear file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      
      formData.append("role", role);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("phoneNumber", phoneNumber);
      if (image) formData.append("avatar", image);
      setIsLoading(true)

      const response =await axios.patch("/api/users/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      console.log("datatttttt",response)
      setIsLoading(false)
      setIsEditing(false);
      onProfileUpdate(); // Notify parent to refresh user data
    } catch (error) {
      setIsLoading(false)
      setError(error.response?.data?.msg );
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true)
  
      await axios.put("/api/users/update-password", {
        oldPassword,
        newPassword,
      });
      
      setIsLoading(false)
    

      setIsChangingPassword(false);
      setError("");
    } catch (error) {
      setIsLoading(false)
      setError(error.response?.data?.msg );
      console.error("Failed to change password", error);
    }
  };

  const togglePasswordVisibility = (setFunction) => {
    setFunction((prev) => !prev);
  };

  return (
    <div className="bg-white p-6 rounded-lg  dark:bg-gray-800 text-gray-700 shadow-md flex flex-col items-center text-center relative">
      <img
        src={previewImage || image ? URL.createObjectURL(image) : avatarUrl || "https://via.placeholder.com/150"}
        alt={`${name}'s profile`}
        className="w-24 h-24 rounded-full mb-4 object-cover"
      />
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-700 mb-4">{email}</p>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      >
        <FaPencilAlt />
      </button>
      <button
        onClick={() => setIsChangingPassword(true)}
        className="absolute top-14 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      >
        <FaKey />
      </button>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
        <div>
          <p>
            <strong>Name:</strong> {name}
          </p>
        </div>
        <div>
          <p>
            <strong>Username:</strong> {username}
          </p>
        </div>
        <div>
          <p>
            <strong>Role:</strong> {role}
          </p>
        </div>
        <div>
          <p>
            <strong>City:</strong> {city}
          </p>
        </div>
        <div>
          <p>
            <strong>State:</strong> {state}
          </p>
        </div>
        <div>
          <p>
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
        </div>
        <div>
          <p>
            <strong>Created At:</strong>{" "}
            {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
        <div>
          <p>
            <strong>Last Updated At:</strong>{" "}
            {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
      </div>

      {isEditing && (
        <div className="fixed overflow-y-auto inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 mt-36 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
             
                <div>
                  <label htmlFor="role" className="block text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-gray-700">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    onChange={handleFileChange}
                    className="w-full mt-1 p-2 border rounded-lg"
                  />
                  {previewImage && (
                    <div className="relative mt-2">
                      <img
                        src={previewImage}
                        alt="Image Preview"
                        className="w-full h-auto max-h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleCancelImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
              >{
                isLoading&&<div className=" border-4 rounded-full  animate-spin flex justify-center border-l-slate-500 w-5 h-5"></div> 
                }
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isChangingPassword && (
        <div className="fixed overflow-y-auto inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Change Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="relative">
                <label htmlFor="oldPassword" className="block text-gray-700">
                  Old Password
                </label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => togglePasswordVisibility(setShowOldPassword)}
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="relative">
                <label htmlFor="newPassword" className="block text-gray-700">
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => togglePasswordVisibility(setShowNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >{
              isLoading&&<div className=" border-4 rounded-full  animate-spin flex justify-center border-l-slate-500 w-5 h-5"></div> 
              }
               Update Password
              </button>
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
