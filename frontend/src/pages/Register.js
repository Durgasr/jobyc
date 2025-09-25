import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, setLoading } = useContext(UserContext);
  const role = location.state?.role;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    resume: null, // <-- file stored here
    experience: "",
    location: "",
    company: "",
    position: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // store file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("role", role);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);

    if (role === "jobseeker") {
      data.append(
        "skills",
        formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : []
      );
      if (formData.resume) data.append("resume", formData.resume);
      data.append("experience", formData.experience);
      data.append("location", formData.location);
    }

    if (role === "recruiter") {
      data.append("company", formData.company);
      data.append("position", formData.position);
      data.append("website", formData.website);
    }

    try {
      const res = await axios.post(
        "http://localhost:3700/api/jobyc/user/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert("User registered successfully!");
      setUser(res.data.user);
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
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
