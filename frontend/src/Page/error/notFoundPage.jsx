import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-semibold text-gray-600 mt-4">Oops! Page Not Found</p>
      <p className="text-gray-500 mt-2">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
