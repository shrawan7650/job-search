import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import useJobs from "../../../../contexApi/useJob";
import axios from "axios";
import Spiner from "../../../Spiner/Spiner";
import { MdDelete } from "react-icons/md";

const JobList = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { jobs, loading, jobError, setJobs } = useJobs();

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/job/delete-job/${jobId}`);
      // Update the jobs state to remove the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      setOpenDropdown(null); // Close the dropdown after deletion
    } catch (err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete job. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-52">
        <Spiner />
      </div>
    );
  if (jobError || error)
    return <div className="flex justify-center mt-52">{jobError || error}</div>;

  return (
    <>
      {jobs?.length === 0 ? (
        <h1 className="uppercase mt-72 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex justify-center font-medium text-3xl">
          No jobs yet
        </h1>
      ) : (
        <div className="w-full mx-auto min-h-[60rem] dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md rounded-lg">
          <div className="flex justify-between   items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              A list of your recent posted jobs
            </h2>
          </div>
          <div className="p-4 overflow-y-auto min-h-[60rem]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:bg-gray-800 text-gray-700 divide-gray-200">
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <img
                        src={job.companyLogo}
                        alt="Company Logo"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-900">
                      {job.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="relative px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="text-lg font-bold cursor-pointer flex items-center space-x-1"
                      >
                        <span>...</span>
                      </button>
                      {openDropdown === index && (
                        <div className="absolute right-0 z-30 top-full  w-48 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
                          <ul className="py-1">
                            <li>
                              <Link
                                to={`/admin/dashboard/postJob/${job._id}`}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                              >
                                <CiEdit className="mr-2" /> Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/admin/dashboard/applicant/${job?.postedBy}`}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                              >
                                <RxEyeOpen className="mr-2" /> Applicant
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={`/admin/dashboard/single-job/${job._id}`}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                              >
                                <RxEyeOpen className="mr-2" /> View Details
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => handleDeleteJob(job._id)}
                                className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                              >
                                <MdDelete className="mr-2" /> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default JobList;
