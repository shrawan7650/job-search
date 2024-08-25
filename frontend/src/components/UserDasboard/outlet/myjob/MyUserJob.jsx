import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RxEyeNone, RxEyeOpen } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../../../contexApi/authContext";

export const MyUserJob = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { myAppliedJob } = useAuth();
  console.log("myAppliedJob", myAppliedJob);
  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <Layout>
      <>
        {myAppliedJob?.length === 0 ? (
          <h1 className="uppercase mt-72  text-gray-700 dark:text-gray-300 flex justify-center font-medium text-3xl">
            No jobs yet
          </h1>
        ) : (
          <div className="w-full mx-auto min-h-[60rem]  text-gray-700 dark:text-gray-300 shadow-md rounded-lg">
            <div className="flex justify-between   items-center p-4 border-b">
              <h2 className="text-lg font-semibold uppercase">
                A list of your recent applied jobs
              </h2>
              {/* calucalte total applied jo */}
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                Total Applied Jobs: {myAppliedJob.length}
              </div>
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y  text-gray-700 divide-gray-200">
                  {myAppliedJob.map((job, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <img
                          src={job.jobId?.companyLogo}
                          alt="Company Logo"
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-900">
                        {job.jobId?.companyName}
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
                          <span>{job.status}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};
