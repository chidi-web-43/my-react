// src/admin/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

function AdminDashboard() {
  const navigate = useNavigate();

  // ✅ CURRENT ELECTION YEAR
  const [electionYear, setElectionYear] = useState(
    localStorage.getItem("electionYear") || new Date().getFullYear().toString()
  );

  // ✅ VOTING STATUS PER YEAR
  const [votingStatus, setVotingStatus] = useState(
    localStorage.getItem(`votingStatus_${electionYear}`) || "closed"
  );

  useEffect(() => {
    localStorage.setItem("electionYear", electionYear);

    const status =
      localStorage.getItem(`votingStatus_${electionYear}`) || "closed";
    setVotingStatus(status);
  }, [electionYear]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  const startVoting = () => {
    localStorage.setItem(`votingStatus_${electionYear}`, "open");
    setVotingStatus("open");
    alert(`✅ Voting started for ${electionYear}`);
  };

  const endVoting = () => {
    localStorage.setItem(`votingStatus_${electionYear}`, "closed");
    setVotingStatus("closed");
    alert(`❌ Voting ended for ${electionYear}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* TOP NAVBAR */}
      <nav className="navbar navbar-dark bg-primary px-4 sticky-top">
        <span className="navbar-brand fw-bold">SUG Admin Dashboard</span>
        <button onClick={handleLogout} className="btn btn-light btn-sm">
          Logout
        </button>
      </nav>

      <div className="container py-5">

        {/* ELECTION YEAR */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold">Election Year</h5>
            <select
              className="form-select mt-2"
              value={electionYear}
              onChange={(e) => setElectionYear(e.target.value)}
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/upload-student")}
            >
              Upload Students
            </button>
          </div>

          <div className="col-md-4 mb-4">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/admin/manage-candidates")}
            >
              Manage Candidates
            </button>
          </div>

          <div className="col-md-4 mb-4">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/results")}
            >
              View Results
            </button>
          </div>
        </div>

        {/* VOTING CONTROL */}
        <div className="card shadow-sm mt-4">
          <div className="card-body text-center">
            <h5 className="fw-bold">Voting Control</h5>

            <p className="fw-semibold">
              Status:
              <span
                className={`ms-2 ${
                  votingStatus === "open" ? "text-success" : "text-danger"
                }`}
              >
                {votingStatus.toUpperCase()}
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
