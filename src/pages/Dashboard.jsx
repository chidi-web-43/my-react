import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const matricNumber = localStorage.getItem("matricNumber");

  // ✅ ADD THIS
  const votingStatus = localStorage.getItem("votingStatus");

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem(`voted_${matricNumber}`);
    if (voted === "true") setHasVoted(true);
  }, [matricNumber]);

  const handleLogout = () => {
    localStorage.removeItem("studentAuth");
    localStorage.removeItem("matricNumber");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>

      {/* TOP BAR */}
      <nav className="navbar navbar-dark bg-success px-4">
        <span className="navbar-brand fw-bold">
          SUG Voting Dashboard
        </span>
        <button onClick={handleLogout} className="btn btn-light btn-sm">
          Logout
        </button>
      </nav>

      <div className="container py-5">

        {/* WELCOME */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="fw-bold">Welcome, Student 👋</h4>
            <p className="text-muted mb-0">
              Matric Number: <strong>{matricNumber}</strong>
            </p>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="row">

          {/* STATUS */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="fw-bold">Voting Status</h5>

                {hasVoted ? (
                  <p className="text-success fw-semibold mt-3">
                    ✅ Voted
                  </p>
                ) : (
                  <p className="text-danger fw-semibold mt-3">
                    ❌ Not Voted
                  </p>
                )}

                <small className="text-muted">
                  One student, one vote.
                </small>
              </div>
            </div>
          </div>

          {/* ELECTION INFO */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="fw-bold">Election Info</h5>
                <p className="mt-3">SUG Presidential Election</p>
                <small className="text-muted">
                  Voting Period: Only Monday
                </small>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="fw-bold">Action</h5>

                <button
                  className="btn btn-success mt-3 w-100"
                  disabled={hasVoted || votingStatus !== "open"}
                  onClick={() => navigate("/vote")}
                >
                  {hasVoted
                    ? "Already Voted"
                    : votingStatus !== "open"
                      ? "Voting Closed"
                      : "Proceed to Vote"}
                </button>


                <small className="text-muted d-block mt-2">
                  Voting can only be done once.
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
