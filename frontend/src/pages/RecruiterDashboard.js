// pages/RecruiterDashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      const res = await axios.get("http://localhost:3700/api/jobyc/jobs/my", {
        withCredentials: true,
      });
      setJobs(res.data.jobs);
    };
    fetchMyJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    await axios.delete(`http://localhost:3700/api/jobyc/jobs/${id}`, {
      withCredentials: true,
    });
    setJobs(jobs.filter((job) => job._id !== id));
  };

 return (
  <div>
    <h2>My Job Posts</h2>
    <Link to="/create-job">+ Create New Job</Link>
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job._id}
            style={{ border: "1px solid gray", padding: "1rem", margin: "1rem 0" }}
          >
            <h3>{job.designation}</h3>
            <p>{job.location}</p>
            <button onClick={() => handleDelete(job._id)}>Delete</button>
            <Link to={`/edit-job/${job._id}`}>Edit</Link>
          </div>
        ))
      ) : (
        <p>No job posts found.</p>
      )}
    </div>
  </div>
);

}
