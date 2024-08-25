import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spiner from "../../../../Spiner/Spiner";

const SingleJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true); // Show loading spinner while fetching data
        const response = await axios.get(`/api/job/single-job/${id}`);
        console.log(response); // For debugging purposes, remove before production
        setJob(response.data.job);
        setLoading(false); // Hide loading spinner after fetching data
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Error fetching job. Please try again later.");
        setLoading(false); // Hide loading spinner if there's an error
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-52 flex justify-center">
        <Spiner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!job) {
    return <div className="text-center">No job found.</div>;
  }

  return (
    <div className="container dark:bg-gray-800 text-gray-700 dark:text-gray-300 mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="w-20 h-20 object-cover rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.companyName}</p>
          </div>
        </div>
        <table className="table-auto w-full">
          <tbody>
            <tr className="border-t">
              <td className="py-2 font-semibold">Type</td>
              <td className="py-2">{job.jobType}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Location</td>
              <td className="py-2">{job.location}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Introduction</td>
              <td className="py-2">{job.jobIntroduction}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Responsibilities</td>
              <td className="py-2">{job.responsibilities}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Qualifications</td>
              <td className="py-2">{job.qualifications}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Niche</td>
              <td className="py-2">{job.jobNiche}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Salary</td>
              <td className="py-2">₹{job.salary}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Application Deadline</td>
              <td className="py-2">
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Work Levels</td>
              <td className="py-2">
                {job.workLevels.map((level) => level.level).join(", ")}
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Experience
</td>
              <td className="py-2">
                {job.workLevels.map((level) => level.experience).join(", ")}
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Languages</td>
              <td className="py-2">
                {job.languages.map((language) => language.language).join(", ")},
                {job.languages
                  .map((language) => language.proficiency)
                  .join(", ")}
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Posted by</td>
              <td className="py-2">{job.postedBy?.name || "N/A"}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Job-Status</td>
              <td className="py-2">{job.jobStatus || "N/A"}</td>
            </tr>
            <tr className="border-t">
              <td className="py-2 font-semibold">Posted on</td>
              <td className="py-2">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleJob;
