import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spiner from "../../../Spiner/Spiner";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [visibleJobs, setVisibleJobs] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); // Show loading spinner while fetching data
        const response = await axios.get("/api/job/all-jobs");
        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs); // Initialize filteredJobs with all jobs
        setLoading(false); // Hide loading spinner after fetching data
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(error.response?.data?.msg);
        setLoading(false); // Hide loading spinner if there's an error
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const filterJobs = () => {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
          job.companyName.toLowerCase().includes(searchCompany.toLowerCase())
      );
      setFilteredJobs(filtered);
      setVisibleJobs(6); // Reset visible jobs when filtering
    };
    filterJobs();
  }, [searchTitle, searchCompany, jobs]);

  const handleLoadMore = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 6);
  };

  const handleShowLess = () => {
    setVisibleJobs(6);
  };

  return (
    <div className="container  dark:bg-gray-800 text-gray-700 dark:text-gray-300 mx-auto p-4">
      <div className="md:text-2xl text-sm flex justify-between font-bold mb-4">
        <h1>All Jobs</h1>
        <h2>
          Showing {visibleJobs} of {filteredJobs.length} jobs.
        </h2>
      </div>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border p-2 rounded text-black outline-none mr-2"

        />
        <input
          type="text"
          placeholder="Search by company name"
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
          className="border p-2 rounded text-black outline-none mr-2"
        />
      </div>

      {loading ? (
        <div className="text-center flex justify-center mt-52 ">
          {" "}
          <Spiner />{" "}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center">No jobs found.</div>
      ) : (
        <>
          <div className="grid gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.slice(0, visibleJobs).map((job) => (
              <div key={job._id} className="bg-white p-4  dark:bg-gray-800 text-gray-700 rounded-lg shadow-md">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="h-12 w-12 rounded-full object-cover mb-2"
                />
                <h2 className="text-xl font-semibold">Title: {job.title}</h2>
                <p className="text-gray-600">JobType: {job.jobType}</p>
                <p className="text-gray-600">CompanyName: {job.companyName}</p>
                <p className="text-gray-600">
                  CreatedAt: {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Last Updated: {new Date(job.updatedAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/admin/dashboard/single-job/${job._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            {visibleJobs < filteredJobs.length && (
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Load More
              </button>
            )}
            {visibleJobs > 6 && (
              <button
                onClick={handleShowLess}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-700"
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllJobs;
