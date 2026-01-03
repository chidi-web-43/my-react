import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

function Login() {
  const navigate = useNavigate();

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

    if (!/^\d+$/.test(matricNumber)) {
      setError("Matric Number must contain numbers only.");
      return;
    }

    // Temporary frontend authentication
    localStorage.setItem("studentAuth", "true");
    localStorage.setItem("matricNumber", matricNumber);

    navigate("/dashboard");
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#eef2f6" }}>
      <div className="card shadow-lg border-0" style={{ width: "460px" }}>

        {/* HEADER */}
        <div className="card-header bg-success text-white text-center py-4">
          <img src={logo} alt="UAES Logo" width="80" className="mb-2" />
          <h5 className="fw-bold mb-0">University of Agriculture & Environmental Science</h5>
          <small className="opacity-75">Students’ Union Government (SUG)</small>
        </div>

        {/* BODY */}
        <div className="card-body p-4">
          <h4 className="text-center fw-bold mb-2">Student Login Portal</h4>
          <p className="text-center text-muted mb-4">
            Enter your Matric Number and password to access your dashboard.
          </p>

          {error && <div className="alert alert-danger text-center py-2">{error}</div>}

          <form onSubmit={handleLogin}>

            {/* MATRIC NUMBER */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Matric Number</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value.replace(/\D/g, ""))}
                placeholder="e.g. 2023004567"
              />
            </div>

            {/* PASSWORD WITH EYE */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>

              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
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
            </div>

            <button type="submit" className="btn btn-success btn-lg w-100 fw-semibold">
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Only eligible students are permitted to access this system.
            </small>
          </div>
        </div>

        {/* FOOTER */}
        <div className="card-footer text-center bg-light small text-muted">
          © {new Date().getFullYear()} UAES SUG Voting System
        </div>

      </div>
    </div>
  );
}

export default Login;
