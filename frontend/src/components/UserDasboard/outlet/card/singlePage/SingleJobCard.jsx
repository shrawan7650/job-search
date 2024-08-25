import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../../Layout/Layout";
import Spiner from "../../../../Spiner/Spiner";
import axios from "axios";
import { useAuth } from "../../../../../contexApi/authContext";
import ApplyModal from "./ApplyModel";

const JobCardSingle = () => {
  const { id } = useParams();
  const {token,usersData} = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [simlarDetailsLoading, setSimlarDetailsLoading] = useState(true);
  const [singlejobloading, setSinglejobLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setSinglejobLoading(true);
        const response = await axios.get(`/api/job/single-job/${id}`);
        setJob(response.data.job);
        setSinglejobLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Error fetching job. Please try again later.");
        setSinglejobLoading(false);
      }
    };

    const fetchSimilarJobs = async () => {
      try {
        setSimlarDetailsLoading(true);
        const response = await axios.get(`/api/job/similar-jobs`);
        console.log("hhhh", response); // For debugging purposes only, remove before production
        setSimilarJobs(response.data.jobs);
        setSimlarDetailsLoading(false);
      } catch (error) {
        console.error("Error fetching similar jobs:", error);
        setError("Error fetching similar jobs. Please try again later.");
        setSimlarDetailsLoading(false);
      }
    };

    fetchJob();
    fetchSimilarJobs();
  }, [id]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = similarJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const handleApplyClick = () => {
    setIsModalOpen(true);
 
  };
  console.log("singlehandleapply",job)

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        {simlarDetailsLoading ? (
        <div className="w-full border border-gray-500 md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto flex justify-center items-center">
            <div
            aria-label="Loading..."
            role="status"
            class="flex items-center space-x-2"
          >
            <svg
              class="h-20 w-20 animate-spin stroke-gray-500"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
            </svg>
            <span class="text-4xl font-medium text-gray-500"></span>
          </div>
        </div>
        ) : (
          <>
          <div className="w-full border border-gray-500 md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search similar jobs"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            />
           
            <div>
              {filteredJobs.map((similarJob) => (
                <div
                  key={similarJob.id}
                  className="mb-4 cursor-pointer"
                  onClick={() => navigate(`/job/${similarJob.id}`)}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-500 p-2 rounded-full">
                      <svg
                        className="h-8 w-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4 3a1 1 0 00-1 1v2H2a1 1 0 000 2h1v6a2 2 0 002 2h10a2 2 0 002-2V8h1a1 1 0 100-2h-1V4a1 1 0 00-1-1H4zm3 3V4h6v2H7zm3 3a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">
                        {similarJob.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {similarJob.companyName}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{similarJob.jobType}</span>
                    <span>{similarJob.experience}</span>
                    <span>{similarJob.workLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div></>
        )}
        {singlejobloading ? (
          <div className="w-full min-h-screen flex justify-center items-center">
            <div className="border-4 rounded-full animate-spin flex justify-center w-24 h-24"></div>
          </div>
        ) : (
          <div className="flex-grow p-4">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={job.companyLogo}
                  alt="Company Logo"
                  className="w-24 h-24 object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-gray-700">
                  companyName: {job.companyName} -Location: {job.location}
                  </p>
                  <p className="text-gray-500">
                    Posted on {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Job Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <strong>Job Type:</strong> {job.jobType}
                      </p>
                      <p>
                        <strong>Job Niche:</strong> {job.jobNiche}
                      </p>
                      <p>
                        <strong>Salary:</strong> ₹{job.salary}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Application Deadline:</strong>{" "}
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </p>
                      <p>
                        <strong
                          className={`text-lg ${
                            job.jobStatus === "Active"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {job.jobStatus}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Responsibilities
                  </h3>
                  <p>{job.responsibilities}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
                  <p>{job.qualifications}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p>{job.location}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Work Levels</h3>
                  <ul className="list-disc list-inside">
                    {job.workLevels.map((level, index) => (
                      <li key={index}>
                        {level.level} - {level.experience}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Languages</h3>
                  <ul className="list-disc list-inside">
                    {job.languages.map((language, index) => (
                      <li key={index}>
                        {language.language} - {language.proficiency}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end space-x-2">
                {usersData && (
                <button
                  onClick={handleApplyClick}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Apply
                </button>
              )}
                </div>
              </div>
            </div>
          </div>
        )}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
        userData={usersData}
        onApply={handleApplyClick}
        token = {token}
      />
      </div>
    </Layout>
  );
};

export default JobCardSingle;
