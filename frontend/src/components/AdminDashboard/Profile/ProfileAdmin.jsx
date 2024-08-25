import React from 'react';
import { useAuth } from '../../../contexApi/authContext'; // Import useAuth for fetching user dataimport Spiner from '../../Spiner/Spiner'; // Import spinner for loading state
import ProfileCard from './outlet/ProfileCard/UpdateProfile';
import Spiner from '../../Spiner/Spiner';
import axios from 'axios';



const ProfileAdmin = () => {
  const { usersData, loading, setUsersData,token } = useAuth(); // Destructure user data and loading state

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
    <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersData && (
          <ProfileCard user={usersData} onProfileUpdate={handleProfileUpdate} />
        )}
      </div>
    
    </div>
  );
};

export default ProfileAdmin;
