import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  // ================= AUTH DATA =================
  const matricNumber = localStorage.getItem("matricNumber");
  const studentName = localStorage.getItem("studentName");

  // ================= ELECTION DATA =================
  const electionYear =
    localStorage.getItem("electionYear") ||
    new Date().getFullYear().toString();

  const votingStatus =
    localStorage.getItem(`votingStatus_${electionYear}`) || "closed";

  const [hasVoted, setHasVoted] = useState(false);

  // ================= CHECK VOTE STATUS =================
  useEffect(() => {
    const voted = localStorage.getItem(
      `voted_${electionYear}_${matricNumber}`
    );

    setHasVoted(voted === "true");
  }, [matricNumber, electionYear]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("studentAuth");
    localStorage.removeItem("matricNumber");
    localStorage.removeItem("studentName");
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* ================= TOP BAR ================= */}
      <nav className="navbar navbar-dark bg-success px-4 sticky-top">
        <span className="navbar-brand fw-bold">
          SUG Voting Dashboard – {electionYear}
        </span>
        <button onClick={handleLogout} className="btn btn-light btn-sm">
          Logout
        </button>
      </nav>

      <div className="container py-5">

        {/* ================= WELCOME CARD ================= */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="fw-bold mb-1">
              Welcome, {studentName}
            </h4>
            <p className="text-muted mb-0">
              Matric Number: <strong>{matricNumber}</strong>
            </p>
          </div>
        </div>

        {/* ================= DASHBOARD CARDS ================= */}
        <div className="row">

          {/* ===== VOTING STATUS ===== */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="fw-bold">Your Voting Status</h5>

                {hasVoted ? (
                  <p className="text-success fw-semibold mt-3">
                    ✅ You have voted
                  </p>
                ) : (
                  <p className="text-danger fw-semibold mt-3">
                    ❌ You have not voted
                  </p>
                )}

                <small className="text-muted">
                  One student — one vote.
                </small>
              </div>
            </div>
          </div>

          {/* ===== ELECTION INFO ===== */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="fw-bold">Election Information</h5>

                <p className="mt-3 mb-1">
                  Students’ Union Government (SUG)
                </p>

                <p className="fw-semibold">
                  Election Year: {electionYear}
                </p>

                <p
                  className={`fw-bold ${
                    votingStatus === "open"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  Voting is {votingStatus.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* ===== ACTION ===== */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body">
                <h5 className="fw-bold">Action</h5>

                <button
                  className={`btn mt-3 w-100 ${
                    hasVoted
                      ? "btn-secondary"
                      : votingStatus !== "open"
                      ? "btn-danger"
                      : "btn-success"
                  }`}
                  disabled={hasVoted || votingStatus !== "open"}
                  onClick={() => navigate("/vote")}
                >
                  {hasVoted
                    ? "✅ Already Voted"
                    : votingStatus !== "open"
                    ? "🚫 Voting Closed"
                    : "🗳️ Proceed to Vote"}
                </button>

                <small className="text-muted d-block mt-2">
                  Voting is allowed only when opened by the Electoral Committee.
                </small>
              </div>
            </div>
          </div>

        </div>

        {/* ================= NOTICE ================= */}
        <div className="alert alert-info mt-4 text-center">
          🗳️ This election is conducted under the supervision of the
          Students’ Union Government Electoral Committee.
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
