import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState(6);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchUsers = async () => {
      try {
        setLoading(true);
         // const response = await axios.get('/api/users/last-2-days');
        //  testing purpose
        const response = [
          { _id: '1', username: 'user1', email: 'user1@example.com', createdAt: new Date().toISOString() },
          { _id: '2', username: 'user2', email: 'user2@example.com', createdAt: new Date().toISOString() },
          { _id: '3', username: 'user3', email: 'user3@example.com', createdAt: new Date().toISOString() },
          { _id: '4', username: 'user4', email: 'user4@example.com', createdAt: new Date().toISOString() },
          { _id: '5', username: 'user5', email: 'user5@example.com', createdAt: new Date().toISOString() },
          { _id: '6', username: 'user6', email: 'user6@example.com', createdAt: new Date().toISOString() },
          { _id: '7', username: 'user7', email: 'user7@example.com', createdAt: new Date().toISOString() },
          { _id: '8', username: 'user8', email: 'user8@example.com', createdAt: new Date().toISOString() },
          { _id: '9', username: 'user9', email: 'user9@example.com', createdAt: new Date().toISOString() },
          { _id: '10', username: 'user10', email: 'user10@example.com', createdAt: new Date().toISOString() },
          { _id: '11', username: 'user11', email: 'user11@example.com', createdAt: new Date().toISOString() },
          { _id: '12', username: 'user12', email: 'user12@example.com', createdAt: new Date().toISOString() },
          { _id: '1', username: 'user1', email: 'user1@example.com', createdAt: new Date().toISOString() },
          { _id: '2', username: 'user2', email: 'user2@example.com', createdAt: new Date().toISOString() },
          { _id: '3', username: 'user3', email: 'user3@example.com', createdAt: new Date().toISOString() },
          { _id: '4', username: 'user4', email: 'user4@example.com', createdAt: new Date().toISOString() },
          { _id: '5', username: 'user5', email: 'user5@example.com', createdAt: new Date().toISOString() },
          { _id: '6', username: 'user6', email: 'user6@example.com', createdAt: new Date().toISOString() },
          { _id: '7', username: 'user7', email: 'user7@example.com', createdAt: new Date().toISOString() },
          { _id: '8', username: 'user8', email: 'user8@example.com', createdAt: new Date().toISOString() },
          { _id: '9', username: 'user9', email: 'user9@example.com', createdAt: new Date().toISOString() },
          { _id: '10', username: 'user10', email: 'user10@example.com', createdAt: new Date().toISOString() },
          { _id: '11', username: 'user11', email: 'user11@example.com', createdAt: new Date().toISOString() },
          { _id: '12', username: 'user12', email: 'user12@example.com', createdAt: new Date().toISOString() },
        ];
        setUsers(response);
          // setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLoadMore = () => {
    setDisplayedUsers(prevCount => prevCount + 6);
  };

  const handleLoadLess = () => {
    setDisplayedUsers(prevCount => (prevCount > 6 ? prevCount - 6 : 6));
  };

  return (
    <div className="p-6 bg-white w-60 md:w-96 rounded-lg shadow-md border mt-10 ml-5 border-gray-200 max-h-[30rem] overflow-y-auto no-scrollbar">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">New Users (Last 2 Days)</h2>
      {loading ? (
         <div className=" w-full min-h-screen flex justify-center ">
         <div className=" border-4 rounded-full  animate-spin flex justify-center border-l-slate-500 w-20 h-20"></div>
       </div>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <ul className="space-y-4">
              {users.slice(0, displayedUsers).map(user => (
                <li key={user._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100 rounded-lg">
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-lg font-semibold text-gray-700">{user.username}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 text-sm text-gray-400 flex flex-col sm:flex-row sm:space-x-4">
                    <span>{new Date(user.createdAt).toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex justify-between">
            {!loading && !error && displayedUsers < users.length && (
              <button 
                onClick={handleLoadMore} 
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Load More
              </button>
            )}
            {!loading && !error && displayedUsers > 6 && (
              <button 
                onClick={handleLoadLess} 
                className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                Load Less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NewUsers;

<style jsx>{`
  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left: 4px solid #4a5568;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>
