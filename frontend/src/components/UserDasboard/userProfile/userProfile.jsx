import React from "react";

import axios from "axios";
import { useAuth } from "../../../contexApi/authContext";
import Spiner from "../../Spiner/Spiner";
import ProfileCard from "./EditProfile";
import SearchBar from "../outlet/SearchMenu";
import Layout from "../../Layout/Layout";

const UserProfile = () => {
  const { usersData, loading, setUsersData, token } = useAuth(); // Destructure user data and loading state

  if (loading) return <Spiner />; // Show spinner while loading

  // Function to refresh user profile data
  const handleProfileUpdate = async () => {
    const response = await axios.get("/api/users/profile", {
      headers: {
        Authorization: token,
      },
    });
    console.log(response); // This should log the user data if the token is valid
    setUsersData(response?.data?.user || []);
  };

  return (
    <>
 
    <Layout>
    <div className="p-4 bg-gray-100 dark:text-gray-300 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersData && (
            <ProfileCard
              user={usersData}
              onProfileUpdate={handleProfileUpdate}
            />
          )}
        </div>
      </div>
    </Layout>
    </>
  );
};

export default UserProfile;
