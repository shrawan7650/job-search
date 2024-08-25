import React, { useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaKey, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import moment from "moment";
import { useAuth } from "../../../contexApi/authContext";
import { jobNiches } from "../../../store/nichesData";

const ProfileCard = ({ user, onProfileUpdate }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [image, setImage] = useState(null);
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
  const [firstNiche, setFirstNiche] = useState(user?.niches?.firstNiche || "");
  const [secondNiche, setSecondNiche] = useState(
    user?.niches?.secondNiche || ""
  );
  const [thirdNiche, setThirdNiche] = useState(user?.niches?.thirdNiche || "");
  const [coverLetter, setCoverLetter] = useState(user?.coverLetter || "");
  const [resume, setResumeUrl] = useState(user?.resume || "");
  const [resumePreview, setResumePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCancelImage = () => {
    setImage(null);
    setPreviewImage(null);
    document.getElementById("imageInput").value = ""; // Clear file input
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResumeUrl(file);
    }
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
      formData.append("coverLetter", coverLetter);
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);

      if (image) formData.append("avatar", image);
      if (resume) formData.append("resume", resume);

      setIsLoading(true);

      await axios.patch("/api/users/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      setIsLoading(false);
      setIsEditing(false);
      onProfileUpdate(); // Notify parent to refresh user data
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.msg);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      await axios.put(
        "/api/users/update-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setIsLoading(false);
      setIsChangingPassword(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.msg);
      console.error("Failed to change password", error);
    }
  };

  const togglePasswordVisibility = (setFunction) => {
    setFunction((prev) => !prev);
  };

  return (
    <div className="bg-white p-6 rounded-lg text-black flex flex-col items-center text-center relative">
      <img
        src={
          previewImage || image
            ? previewImage
            : avatarUrl || "https://via.placeholder.com/150"
        }
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
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-700"
                  >
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
                  <label htmlFor="coverLetter" className="block text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="firstNiche" className="block text-gray-700">
                    First Niche
                  </label>
                  <select
                    id="firstNiche"
                    value={firstNiche}
                    onChange={(e) => setFirstNiche(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  >
                    <option value="">Select First Niche</option>
                    {jobNiches.map((niche, index) => (
                      <option key={index} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="secondNiche" className="block text-gray-700">
                    Second Niche
                  </label>
                  <select
                    id="secondNiche"
                    value={secondNiche}
                    onChange={(e) => setSecondNiche(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Second Niche</option>
                    {jobNiches.map((niche, index) => (
                      <option key={index} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="thirdNiche" className="block text-gray-700">
                    Third Niche
                  </label>
                  <select
                    id="thirdNiche"
                    value={thirdNiche}
                    onChange={(e) => setThirdNiche(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Third Niche</option>
                    {jobNiches.map((niche, index) => (
                      <option key={index} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="resume" className="block text-gray-700">
                    Resume
                  </label>
                  <input
                    type="file"
                    id="resume"
                    onChange={handleResumeChange}
                    className="w-full mt-1 p-2 border rounded-lg"
                    accept=".pdf,.doc,.docx"
                  />
                  {resumePreview && (
                    <div className="mt-2">
                      <embed
                        src={resumePreview}
                        width="100%"
                        height="200px"
                        type="application/pdf"
                      />
                    </div>
                  )}
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
                    accept="image/*"
                  />
                  {previewImage && (
                    <div className="relative mt-2">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button
                        onClick={handleCancelImage}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isChangingPassword && (
        <div className="fixed overflow-y-auto inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 mt-36 rounded-lg shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Change Password
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block text-gray-700">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(setShowOldPassword)
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(setShowNewPassword)
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(setShowConfirmPassword)
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {isLoading ? "Saving..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
