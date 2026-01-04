import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

function Login() {
  const navigate = useNavigate();

  const electionYear =
    localStorage.getItem("electionYear") || new Date().getFullYear().toString();

  const students =
    JSON.parse(localStorage.getItem(`students_${electionYear}`)) || [];

  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!matricNumber || !password) {
      setError("Please enter your Matric Number and Password.");
      return;
    }

    const student = students.find(
      (s) => s.matric === matricNumber
    );

    if (!student) {
      setError(
        "❌ You are NOT eligible for this election. Contact the Electoral Committee."
      );
      return;
    }

    localStorage.setItem("studentAuth", "true");
    localStorage.setItem("matricNumber", student.matric);
    localStorage.setItem("studentName", student.name);

    navigate("/dashboard");
  };

  return (
    <div className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#eef2f6" }}
    >
      <div className="card shadow-lg border-0" style={{ width: "460px" }}>
        <div className="card-header bg-success text-white text-center py-4">
          <img src={logo} width="80" className="mb-2" />
          <h5 className="fw-bold mb-0">
            University of Agriculture & Environmental Science
          </h5>
          <small className="opacity-75">
            SUG Voting – {electionYear}
          </small>
        </div>

        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              className="form-control form-control-lg mb-3"
              placeholder="Matric Number"
              value={matricNumber}
              onChange={(e) =>
                setMatricNumber(e.target.value.replace(/\D/g, ""))
              }
            />

            <div className="input-group mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </span>
            </div>

            <button className="btn btn-success btn-lg w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
