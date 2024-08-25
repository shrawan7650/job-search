import React, { useState, useEffect } from "react";
import SearchBar, { salaryRanges } from "./SearchMenu";
import JobsCardsUserSide from "./card/JobCards";
import Footer from "../../Footer/Footer";
import axios from "axios";

const UserDashboardContainer = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");
 

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
        setLoading(false); // Hide loading spinner if there's an error
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const filterJobData = jobs.filter((jobItem) => {
      const salary = jobItem.salary || 0; // Ensure salary is a number
      const salaryRange = salaryRanges.find((range) => range.label === selectedSalaryRange);
      
      return (
        jobItem.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        jobItem.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        (selectedJobType ? jobItem.jobType === selectedJobType : true) &&
        (salaryRange ? salary >= salaryRange.min && salary <= salaryRange.max : true)
       
      );
    });
    setFilteredJobs(filterJobData);
  }, [searchTitle, searchLocation, selectedJobType, selectedSalaryRange, jobs]);
  

  return (
    <div>
      <SearchBar
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        selectedSalaryRange={selectedSalaryRange}
        setSelectedSalaryRange={setSelectedSalaryRange}
       
      />

<div className="min-h-[50rem]">
      {loading ? (
       <div className="w-full min-h-[50rem] flex justify-center items-center ">
         <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
       </div>
      ) : filteredJobs.length > 0 ? (
        <JobsCardsUserSide jobs={filteredJobs} />
      ) : (
<div  className="w-full min-h-[50rem] flex justify-center items-center ">
<div className="text-4xl text-red-600 font-extralight ">No jobs found</div>
</div>
      )}
    </div>

      <Footer />
    </div>
  );
};

export default UserDashboardContainer;
