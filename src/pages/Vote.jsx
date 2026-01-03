import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Vote() {
  const navigate = useNavigate();

  const matricNumber = localStorage.getItem("matricNumber");
  const studentName = localStorage.getItem("studentName");

  const electionYear =
    localStorage.getItem("electionYear") || new Date().getFullYear().toString();

  const votingStatus =
    localStorage.getItem(`votingStatus_${electionYear}`) || "closed";

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  // ================= LOAD CANDIDATES =================
  useEffect(() => {
    const storedCandidates =
      JSON.parse(localStorage.getItem(`candidates_${electionYear}`)) || [];

    setCandidates(storedCandidates);
  }, [electionYear]);

  // ================= CHECK CONDITIONS =================
  useEffect(() => {
    if (votingStatus !== "open") {
      alert("Voting is currently closed.");
      navigate("/dashboard");
    }

    const voted = localStorage.getItem(
      `voted_${electionYear}_${matricNumber}`
    );

    if (voted === "true") {
      alert("You have already voted.");
      navigate("/dashboard");
    }
  }, [navigate, matricNumber, electionYear, votingStatus]);

  // ================= SUBMIT VOTE =================
  const handleVote = () => {
    if (!selectedCandidate) {
      alert("Please select a candidate.");
      return;
    }

    const votesKey = `votes_${electionYear}`;
    const votes = JSON.parse(localStorage.getItem(votesKey)) || {};

    votes[selectedCandidate] = (votes[selectedCandidate] || 0) + 1;

    localStorage.setItem(votesKey, JSON.stringify(votes));

    localStorage.setItem(
      `voted_${electionYear}_${matricNumber}`,
      "true"
    );

    alert("Your vote has been submitted successfully.");
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* ================= NAV ================= */}
      <nav className="navbar navbar-dark bg-success px-4">
        <span className="navbar-brand fw-bold">
          SUG Voting – {electionYear}
        </span>
      </nav>

      <div className="container py-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="fw-bold mb-2">Cast Your Vote</h4>
            <p className="text-muted">
              Student: <strong>{studentName}</strong> | Matric:{" "}
              <strong>{matricNumber}</strong>
            </p>

            <hr />

            {candidates.length === 0 ? (
              <p className="text-danger text-center">
                No candidates available for this election year.
              </p>
            ) : (
              <form>
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="form-check border rounded p-3 mb-3"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="candidate"
                      value={candidate.id}
                      onChange={() => setSelectedCandidate(candidate.id)}
                    />
                    <label className="form-check-label ms-2">
                      <strong>{candidate.name}</strong>
                      <br />
                      <small className="text-muted">
                        Position: {candidate.position}
                      </small>
                    </label>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-success w-100 mt-3"
                  onClick={handleVote}
                >
                  Submit Vote
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vote;
