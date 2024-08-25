import React, { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineAppstore } from 'react-icons/ai';
import { FaChartLine, FaCog } from 'react-icons/fa';
import axios from 'axios';
import NewUsers from './outlet/newUser/NewUser';

const DashboardHomepage = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [newUsers, setNewUsers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch total projects
  //       const projectsResponse = await axios.get('/api/projects/total');
  //       setTotalProjects(projectsResponse.data.total);

  //       // Fetch new user registrations
  //       const usersResponse = await axios.get('/api/users/new');
  //       setNewUsers(usersResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col w-full relative   dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-h-screen bg-gray-100">
   
      <NewUsers/>
    </div>
  );
};

export default DashboardHomepage;
