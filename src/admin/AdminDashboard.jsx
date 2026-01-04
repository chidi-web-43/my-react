import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

function AdminDashboard() {
  const navigate = useNavigate();

  const electionYear =
    localStorage.getItem("electionYear") ||
    new Date().getFullYear().toString();

  const [votingStatus, setVotingStatus] = useState(
    localStorage.getItem(`votingStatus_${electionYear}`) || "closed"
  );

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  /* ================= VOTING CONTROL ================= */
  const startVoting = () => {
    localStorage.setItem(`votingStatus_${electionYear}`, "open");
    setVotingStatus("open");
    alert("✅ Voting has started");
  };

  const endVoting = () => {
    localStorage.setItem(`votingStatus_${electionYear}`, "closed");
    setVotingStatus("closed");
    alert("❌ Voting has ended");
  };

  useEffect(() => {
    if (!localStorage.getItem(`votingStatus_${electionYear}`)) {
      localStorage.setItem(`votingStatus_${electionYear}`, "closed");
    }
  }, [electionYear]);
  useEffect(() => {
  const year = new Date().getFullYear().toString();

  if (!localStorage.getItem("electionYear")) {
    localStorage.setItem("electionYear", year);
  }
}, []);


  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-dark bg-primary px-4 sticky-top">
        <span className="navbar-brand fw-bold">
          SUG Admin Dashboard – {electionYear}
        </span>
        <button onClick={handleLogout} className="btn btn-light btn-sm">
          Logout
        </button>
      </nav>

      <div className="container py-5">
        {/* ================= WELCOME ================= */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="fw-bold mb-1">Welcome, Administrator 👋</h4>
            <p className="text-muted mb-0">
              Manage all election processes for the {electionYear} academic
              session.
            </p>
          </div>
        </div>

        {/* ================= ACTION CARDS ================= */}
        <div className="row">
          {/* UPLOAD STUDENTS */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm text-center h-100 p-3">
              <h5 className="fw-bold">Upload Students</h5>
              <p className="text-muted">
                Register eligible voters for this election.
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/upload-student")}
              >
                Upload Students
              </button>
            </div>
          </div>

          {/* MANAGE CANDIDATES */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm text-center h-100 p-3">
              <h5 className="fw-bold">Manage Candidates</h5>
              <p className="text-muted">
                Add, edit, or remove election candidates.
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate("/admin/manage-candidates")}
              >
                Manage Candidates
              </button>
            </div>
          </div>

          {/* RESULTS */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm text-center h-100 p-3">
              <h5 className="fw-bold">Election Results</h5>
              <p className="text-muted">
                Monitor votes and declare winners.
              </p>
              <button
                className="btn btn-dark w-100"
                onClick={() => navigate("/admin/results")}
              >
                View Results
              </button>
            </div>
          </div>
        </div>

        {/* ================= VOTING CONTROL ================= */}
        <div className="card shadow-sm mt-4">
          <div className="card-body text-center">
            <h5 className="fw-bold mb-3">Voting Control Panel</h5>

            <p className="fw-semibold mb-3">
              Current Status:
              <span
                className={`ms-2 ${
                  votingStatus === "open"
                    ? "text-success"
                    : "text-danger"
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
