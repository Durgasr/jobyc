import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, setLoading } = useContext(UserContext);
  const role = location.state?.role; // get role from navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    resumeUrl: "",
    experience: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = { role }; // start with just role

      if (role === "jobseeker") {
        payload = {
          ...payload,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          skills: formData.skills
            ? formData.skills.split(",").map((s) => s.trim())
            : [],
          resumeUrl: formData.resumeUrl,
          experience: formData.experience,
          location: formData.location,
        };
      }

      if (role === "recruiter") {
        payload = {
          ...payload,
          name: formData.name,
          email: formData.email,
          password: formData.password,
          company: formData.company,
          position: formData.position,
          website: formData.website,
        };
      }

      const res = await axios.post(
        "http://localhost:3700/api/jobyc/user/register",
        payload,
        { withCredentials: true }
      );

      alert("User registered successfully!");
      setUser(res.data.user); // updates context
      setLoading(false);
      if (res.data.user.role === "jobseeker") navigate("/jobs");
      else if (res.data.user.role === "recruiter") navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register as {role}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {role === "jobseeker" && (
          <>
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
            />
            <input
              type="text"
              name="resumeUrl"
              placeholder="Resume URL"
              value={formData.resumeUrl}
              onChange={handleChange}
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
          </>
        )}

        {role === "recruiter" && (
          <>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
            />
            <input
              type="text"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};
