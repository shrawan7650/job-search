import { useState, useEffect } from "react";
import axios from "axios";

const useApplicants = (jobId) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      // If jobId is not available, skip fetching
      setLoading(false);
      return;
    }

    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/applicant/admin/applications/${jobId}`);
        console.log(response);
        setApplicants(response?.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return { applicants, loading, error };
};

export default useApplicants;
