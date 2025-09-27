import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const navigate = useNavigate();

  const goToRegister = (role) => {
    navigate("/register", { state: { role } }); // pass role via state
  };

  return (
    <>
      <Navbar />
      <div>
        <button onClick={() => goToRegister("jobseeker")}>
          I am Jobseeker
        </button>
        <button onClick={() => goToRegister("recruiter")}>
          I am Recruiter
        </button>
      </div>
    </>
  );
};
