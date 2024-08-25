import { useState, useEffect } from "react";
import axios from "axios";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/job/jobs/admin`);
        console.log("gggg",response); // For debugging purposes only, remove before production
        setJobs(response.data?.jobs || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, setJobs, loading, error };
};

export default useJobs;
