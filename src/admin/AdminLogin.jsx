import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      <div className="card shadow-lg border-0 p-4" style={{ width: "400px" }}>
        <h3 className="text-center fw-bold mb-3">Admin Login</h3>
        {error && <div className="alert alert-danger py-2 text-center">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-semibold">Login</button>
        </form>
      </div>
    </div>
    
  );
  
}

export default AdminLogin;
