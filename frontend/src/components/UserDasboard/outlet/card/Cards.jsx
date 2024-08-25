import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`Navigating to: /user/dashboard/apply-job/${job._id}`);
    navigate(`/user/dashboard/apply-job/${job._id}`);
  };
  console.log("ggggggg", job);

  return (
    <div className="bg-gray-100 p-4 hover:scale-105 transition-transform duration-700 cursor-pointer rounded-lg shadow-md max-w-sm mx-auto mb-4">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-500 p-2 rounded-full">
          <img
            src={job.companyLogo}
            className="aspect-auto accent-stone-600  max-w-10 max-h-10    bg-white"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-wrap">{job.title}</h3>
          <p className="text-gray-600 text-sm">
            {job.jobIntroduction.slice(0, 100)}
          </p>
        </div>
      </div>
      <div className="flex  gap-3 items-center text-sm text-gray-500 mb-4">
        <span className="text-blue-700 bg-">{job.jobType}</span>
        <span
          className={`${
            job.jobStatus === "Active"
              ? "text-green-600"
              : "text-gray-600" || job.jobStatus === "Closed"
              ? "text-red-600"
              : "text-gray-600" || job.jobStatus === "Inactive"
              ? "text-yellow-600"
              : "text-gray-600"
          }`}
        >
          {job.jobStatus}
        </span>
        {job.workLevels.map((item) => {
          return <span key={item._id}>{item.experience}</span>;
        })}
        <p>
          <strong>Application Deadline:</strong>{" "}
          {new Date(job.applicationDeadline).toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Apply Now
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Messages
        </button>
        <div className="">
        <div className="text-blue-700 flex justify-end ">₹{job.salary}</div>
        <div className="text-blue-700 flex justify-end ">{job.location}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
