// src/admin/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

function AdminDashboard() {
  const navigate = useNavigate();

  const [votingStatus, setVotingStatus] = useState(
    localStorage.getItem("votingStatus") || "closed"
  );

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  // ✅ START VOTING
  const startVoting = () => {
    localStorage.setItem("votingStatus", "open");
    setVotingStatus("open");
    alert("✅ Voting has started");
  };

  // ❌ END VOTING
  const endVoting = () => {
    localStorage.setItem("votingStatus", "closed");
    setVotingStatus("closed");
    alert("❌ Voting has ended");
  };

  useEffect(() => {
    const status = localStorage.getItem("votingStatus");
    if (!status) {
      localStorage.setItem("votingStatus", "closed");
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>

      {/* TOP NAVBAR */}
      <nav className="navbar navbar-dark bg-primary px-4 sticky-top">
        <span className="navbar-brand fw-bold">
          SUG Admin Dashboard
        </span>
        <button onClick={handleLogout} className="btn btn-light btn-sm">
          Logout
        </button>
      </nav>

      <div className="container py-5">

        {/* WELCOME CARD */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="fw-bold mb-1">Welcome, Admin 👋</h4>
            <p className="text-muted mb-0">
              Manage all election processes from here.
            </p>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="row">

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center p-3">
              <h5 className="fw-bold">Upload Students</h5>
              <p className="text-muted mt-2">
                Add eligible students via CSV or form.
              </p>
              <button className="btn btn-primary mt-3 w-100">
                Upload
              </button>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center p-3">
              <h5 className="fw-bold">Manage Candidates</h5>
              <p className="text-muted mt-2">
                View or edit candidate information.
              </p>
              <button className="btn btn-primary mt-3 w-100">
                View Candidates
              </button>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100 text-center p-3">
              <h5 className="fw-bold">Election Results</h5>
              <p className="text-muted mt-2">
                Check votes and monitor results live.
              </p>
              <button className="btn btn-primary mt-3 w-100">
                View Results
              </button>
            </div>
          </div>

        </div>

        {/* VOTING CONTROL PANEL */}
        <div className="card shadow-sm mt-4">
          <div className="card-body text-center">
            <h5 className="fw-bold mb-3">Voting Control</h5>

            <p className="fw-semibold mb-3">
              Current Status:
              <span
                className={`ms-2 ${
                  votingStatus === "open"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {votingStatus === "open" ? "OPEN" : "CLOSED"}
              </span>
            </p>

            <button
              className="btn btn-success me-3"
              disabled={votingStatus === "open"}
              onClick={startVoting}
            >
              Start Voting
            </button>

            <button
              className="btn btn-danger"
              disabled={votingStatus === "closed"}
              onClick={endVoting}
            >
              End Voting
            </button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
