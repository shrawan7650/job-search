import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RxEyeOpen } from "react-icons/rx";
import useApplicants from "../../../../contexApi/useApplicant";
import axios from "axios"; // Import axios for API requests

const Applicant = () => {
  const { id } = useParams();
  const { applicants, loading, error } = useApplicants(id);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleStatusChange = async (applicantId, status) => {
    try {
      // Send the updated status to the backend
      console.log("applicantId",applicantId);
      // Example: Update the status in the database
      console.log("status",status)
     const response =  await axios.patch(`/api/applicant/job-status/${applicantId}/status`, { status });
      console.log("Status updated successfully:", response);

      // Optionally, update the local state or refetch data if needed
      
      // For example, refetch the applicants data or update the applicant's status in the local state
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setOpenDropdown(null); // Close the dropdown after the status is updated
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching applicants: {error.message}</p>;

  return (
    <div className="container mx-auto px-4">
      {applicants.length === 0 ? (
        <h1 className="uppercase mt-72 flex justify-center font-medium text-3xl">
          No applicants yet
        </h1>
      ) : (
        <div className="w-full bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Applicants for Job</h2>
          </div>
          <div className="p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicants.map((applicant, index) => (
                  <tr key={applicant.id}>
                    {console.log(applicant)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {applicant.jobId.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {applicant.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      {applicant.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {applicant.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={applicant.resume}
                        download
                        className="text-blue-600 hover:underline"
                      >
                        Download Resume
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(applicant.createdAt).toLocaleDateString()}
                    </td>
                    <td className="relative group px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="text-lg font-bold cursor-pointer flex items-center space-x-1"
                      >
                        <span>...</span>
                      </button>
                      {openDropdown === index && (
                        <div className="absolute -right-2 -top-1 w-42 z-30 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
                          <ul className="py-1 flex flex-col">
                            <li>
                              <p
                                onClick={() =>
                                  handleStatusChange(applicant._id, "Pending")
                                }
                                className="flex items-center px-4 font-bold text-base uppercase cursor-pointer hover:bg-gray-100"
                              >
                                Pending
                              </p>
                            </li>
                            <li>
                              <p
                                onClick={() =>
                                  handleStatusChange(applicant._id, "Shortlisted")
                                }
                                className="flex items-center px-4 font-bold text-base uppercase cursor-pointer hover:bg-gray-100"
                              >
                                Shortlisted
                              </p>
                            </li>
                            <li>
                              <p
                                onClick={() =>
                                  handleStatusChange(applicant._id, "Selected")
                                }
                                className="flex items-center px-4 font-bold text-base uppercase cursor-pointer hover:bg-gray-100"
                              >
                                Selected
                              </p>
                            </li>
                            <li>
                              <p
                                onClick={() =>
                                  handleStatusChange(applicant._id, "Rejected")
                                }
                                className="flex items-center px-4 font-bold text-base uppercase cursor-pointer hover:bg-gray-100"
                              >
                                Rejected
                              </p>
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
    </div>
  );
};

export default Applicant;
