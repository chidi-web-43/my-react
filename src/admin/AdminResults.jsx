import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminResults() {
  const navigate = useNavigate();

  const electionYear =
    localStorage.getItem("electionYear") || new Date().getFullYear().toString();

  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});

  // ================= AUTH CHECK =================
  useEffect(() => {
    if (localStorage.getItem("adminAuth") !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ================= LOAD DATA =================
  useEffect(() => {
    const storedCandidates =
      JSON.parse(localStorage.getItem(`candidates_${electionYear}`)) || [];

    const storedVotes =
      JSON.parse(localStorage.getItem(`votes_${electionYear}`)) || {};

    setCandidates(storedCandidates);
    setVotes(storedVotes);
  }, [electionYear]);

  // ================= CALCULATE WINNERS =================
  const getWinnerByPosition = (position) => {
    const positionCandidates = candidates.filter(
      (c) => c.position === position
    );

    let winner = null;
    let highestVotes = -1;

    positionCandidates.forEach((candidate) => {
      const count = votes[candidate.id] || 0;
      if (count > highestVotes) {
        highestVotes = count;
        winner = candidate;
      }
    });

    return winner;
  };

  const positions = [...new Set(candidates.map((c) => c.position))];

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* ================= NAV ================= */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">
          Admin Results Panel – {electionYear}
        </span>
        <button
          className="btn btn-light btn-sm"
          onClick={() => navigate("/admin-dashboard")}
        >
          Back to Dashboard
        </button>
      </nav>

      <div className="container py-5">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="fw-bold mb-2">Election Results Overview</h4>
            <p className="text-muted mb-0">
              This panel is visible to administrators only.
            </p>
          </div>
        </div>

        {/* ================= RESULTS TABLE ================= */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Vote Breakdown</h5>

            {candidates.length === 0 ? (
              <p className="text-danger text-center">
                No candidates found for this election year.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>Total Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate, index) => (
                      <tr key={candidate.id}>
                        <td>{index + 1}</td>
                        <td>{candidate.name}</td>
                        <td>{candidate.position}</td>
                        <td className="fw-bold">
                          {votes[candidate.id] || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ================= WINNERS ================= */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Declared Winners</h5>

            {positions.length === 0 ? (
              <p className="text-muted text-center">
                Winners will appear here after votes are recorded.
              </p>
            ) : (
              <div className="row">
                {positions.map((position) => {
                  const winner = getWinnerByPosition(position);

                  return (
                    <div className="col-md-4 mb-3" key={position}>
                      <div className="border rounded p-3 text-center h-100">
                        <h6 className="fw-bold">{position}</h6>
                        {winner ? (
                          <>
                            <p className="mb-1 fw-semibold">
                              🏆 {winner.name}
                            </p>
                            <small className="text-muted">
                              Votes: {votes[winner.id] || 0}
                            </small>
                          </>
                        ) : (
                          <p className="text-muted">No votes yet</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminResults;
