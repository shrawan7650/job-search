import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyModal = ({ isOpen, onClose, job, userData, onApply,token }) => {
  console.log(job)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    email: userData.email || '',
    name: userData.name || '',
    phone: userData.phoneNumber || '',
    resume: null,
    resumedataUrl: userData.resumeUrl || '' // Assuming userData contains the previous resume URL
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log("applyhandleapply",isOpen)
  useEffect(() => {
    if (job) {
      setFormData(prev => ({
        ...prev,
        title: job.title,
        location: job.location
      }));
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'resume' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    // Append resumeUrl if it's not empty
    if (formData.resumedataUrl) {
      formDataToSend.append('resumedataUrl', formData.resumedataUrl);
    }
    try {
     const response =  await axios.post(`/api/applicant/applyJob/${job._id}`, formDataToSend, {
        headers: {
          Authorization:token,
          'Content-Type':'multipart/form-data'
        }
    
      });
      console.log("apply response",response)
      onApply(); // Notify parent component that apply was successful
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error applying for job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 backdrop-blur-lg overflow-y-auto flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Apply for {job?.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Resume</label>
            {formData.resumeUrl && (
              <a href={formData.resumeUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                View Current Resume
              </a>
            )}
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ApplyModal;
