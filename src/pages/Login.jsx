import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate numeric matric number
    if (!matricNumber || !password) {
      setError("Please enter your Matric Number and Password");
      return;
    }

    if (!/^\d+$/.test(matricNumber)) {
      setError("Matric Number must contain numbers only");
      return;
    }

    // Simulate successful login
    localStorage.setItem("studentAuth", "true");
    localStorage.setItem("matricNumber", matricNumber);

    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f4f6f9" }}
    >
      <div className="card shadow-lg border-0" style={{ width: "420px" }}>
        <div className="card-body p-4">

          <h3 className="text-center fw-bold mb-2">Student Login</h3>
          <p className="text-center text-muted mb-4">
            Students’ Union Government (SUG) Voting Portal
          </p>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* MATRIC NUMBER */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Matric Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="form-control"
                placeholder="only number"
                value={matricNumber}
                onChange={(e) => {
                  // Allow only numbers
                  const value = e.target.value.replace(/\D/g, "");
                  setMatricNumber(value);
                }}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-semibold"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Only eligible students can access this portal.
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
