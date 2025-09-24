import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext.js";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, setLoading } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3700/api/jobyc/user/login",
        formData,
        { withCredentials: true } // important to send/receive cookie
      );

      setUser(res.data.user); // update context with logged-in user
      setLoading(false);

      // Redirect based on role
      if (res.data.user.role === "jobseeker") navigate("/jobs");
      else if (res.data.user.role === "recruiter") navigate("/dashboard");

      alert("Login successful!");
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
