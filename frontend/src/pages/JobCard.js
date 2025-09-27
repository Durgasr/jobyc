import React from "react";
import { useNavigate } from "react-router-dom";
import { formatSalary } from "../utils/formatSalary";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/jobs/${job._id}`); // Navigate to job details page
  };

  return (
    <div className="job-card border rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 mb-4">
      <h3 className="text-xl font-bold mb-2">{job.designation}</h3>
      <p className="text-gray-700 mb-1">
        <strong>Company:</strong> {job.companyName}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Category:</strong> {job.category}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>Salary:</strong> {formatSalary(job.salary)}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Skills:</strong> {job.skills.join(", ")}
      </p>

      <Link to="/job-details">View Details</Link>
    </div>
  );
};

export default JobCard;
