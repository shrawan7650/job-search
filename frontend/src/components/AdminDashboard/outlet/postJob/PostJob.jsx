import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jobNiches } from "../../../../store/nichesData";
import { citiesInIndia } from "../../../../store/cityData";

const workLevelsOptions = [
  { level: "Manager", experience: "5+ years" },
  { level: "Senior Developer", experience: "3-5 years" },
  { level: "Junior Developer", experience: "1-3 years" },
  { level: "Intern", experience: "0-1 year" },
];

const languageOptions = [
  { language: "English", proficiency: "Fluent" },
  { language: "Hindi", proficiency: "Fluent" },
];

const jobStatusOptions = ["Active", "Inactive", "Closed"];

const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = !!id; // Determine if it's an edit based on the presence of an ID
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    jobType: "Full-time",
    location: "",
    jobIntroduction: "",
    responsibilities: "",
    qualifications: "",
    salary: "",
    niche: jobNiches[0],
    logo: null,
    jobStatus: jobStatusOptions[0],
    applicationDeadline: "",
    workLevels: [workLevelsOptions[0]],
    languages: [languageOptions[0]],
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      logo: file,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cancelLogoPreview = () => {
    setFormData({
      ...formData,
      logo: null,
    });
    setLogoPreview(null);
  };

  const handleWorkLevelChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkLevels = [...formData.workLevels];
    updatedWorkLevels[index] = {
      ...updatedWorkLevels[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      workLevels: updatedWorkLevels,
    });
  };

  const handleLanguageChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      languages: updatedLanguages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    for (const key in formData) {
      if (key === "workLevels" || key === "languages") {
        formPayload.append(key, JSON.stringify(formData[key]));
      } else {
        formPayload.append(key, formData[key]);
      }
    }

    try {
      setIsLoading(true);
      const response = isEdit
        ? await axios.put(`/api/job/update-job/${id}`, formPayload)
        : await axios.post("/api/job/post-job", formPayload);

      console.log(response.data);
      setIsLoading(false); // Reset loading state after successful submission
      navigate("/admin/dashboard"); // Navigate to jobs page after successful submission
    } catch (error) {
      setIsLoading(false);
      console.error("Error posting job:", error);
      setError(
        error.response?.data?.error || "Failed to post job. Please try again."
      );
    }
  };

  return (
    <div className="py-8">
      <main className="bg-white dark:bg-gray-800 text-gray-700 px-6 md:px-16 py-6">
        <div className="w-full max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h1 className="text-2xl font-bold mb-6">
              {isEdit ? "Update Job" : "Post a Job"}
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Title", name: "title", type: "text" },
                { label: "Company Name", name: "companyName", type: "text" },
                { label: "Salary", name: "salary", type: "number" },
                {
                  label: "Application Deadline",
                  name: "applicationDeadline",
                  type: "date",
                },
                {
                  label: "Job Introduction",
                  name: "jobIntroduction",
                  type: "text",
                },
                {
                  label: "Responsibilities",
                  name: "responsibilities",
                  type: "text",
                },
                {
                  label: "Qualifications",
                  name: "qualifications",
                  type: "text",
                },
              ].map(({ label, name, type }) => (
                <label key={name} className="block mb-4">
                  <span className="text-gray-700">{label}</span>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                  />
                </label>
              ))}

              <label className="block mb-4">
                <span className="text-gray-700">Job Type</span>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                ><option value="" disabled>
                Select a Job type
              </option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Location</span>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {citiesInIndia.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Job Niche</span>
                <select
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                >
                  <option value="" disabled>
                    Select a Job Niche
                  </option>
                  {jobNiches.map((niche, index) => (
                    <option key={index} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Job Status</span>
                <select
                  name="jobStatus"
                  value={formData.jobStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                >
                  {jobStatusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Company Logo</span>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                />
                {logoPreview && (
                  <div className="mt-2">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="max-w-xs h-auto"
                    />
                    <button
                      type="button"
                      onClick={cancelLogoPreview}
                      className="mt-2 text-red-500"
                    >
                      Cancel Preview
                    </button>
                  </div>
                )}
              </label>

              <div className="mb-4">
                <label className="block text-gray-700">Work Levels</label>
                {formData.workLevels.map((workLevel, index) => (
                  <div key={index} className="mb-2">
                    <label className="block">
                      <span className="text-gray-700">Level</span>
                      <select
                        name="level"
                        value={workLevel.level}
                        onChange={(e) => handleWorkLevelChange(index, e)}
                        className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                      >
                        {workLevelsOptions.map((option, idx) => (
                          <option key={idx} value={option.level}>
                            {option.level}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block mt-2">
                      <span className="text-gray-700">Experience</span>
                      <select
                        name="experience"
                        value={workLevel.experience}
                        onChange={(e) => handleWorkLevelChange(index, e)}
                        className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                      >
                        {workLevelsOptions.map((option, idx) => (
                          <option key={idx} value={option.experience}>
                            {option.experience}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Languages</label>
                {formData.languages.map((language, index) => (
                  <div key={index} className="mb-2">
                    <label className="block">
                      <span className="text-gray-700">Language</span>
                      <select
                        name="language"
                        value={language.language}
                        onChange={(e) => handleLanguageChange(index, e)}
                        className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                      >
                        {languageOptions.map((option, idx) => (
                          <option key={idx} value={option.language}>
                            {option.language}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block mt-2">
                      <span className="text-gray-700">Proficiency</span>
                      <select
                        name="proficiency"
                        value={language.proficiency}
                        onChange={(e) => handleLanguageChange(index, e)}
                        className="mt-1 block w-full border-2 text-black border-black rounded-md shadow-sm"
                      >
                        {languageOptions.map((option, idx) => (
                          <option key={idx} value={option.proficiency}>
                            {option.proficiency}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PostJob;
