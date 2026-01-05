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

  /* ================= LOAD CANDIDATES ================= */
  useEffect(() => {
    const storedCandidates =
      JSON.parse(localStorage.getItem(`candidates_${electionYear}`)) || [];
    setCandidates(storedCandidates);
  }, [electionYear]);

  /* ================= CHECK ELIGIBLE STUDENT ================= */
  useEffect(() => {
    const students =
      JSON.parse(localStorage.getItem(`students_${electionYear}`)) || [];

    const eligible = students.some(
      (s) => s.matric === matricNumber
    );

    if (!eligible) {
      alert("❌ You are not eligible to vote. Your matric number was not uploaded.");
      navigate("/dashboard");
    }
  }, [electionYear, matricNumber, navigate]);

  /* ================= CHECK VOTING CONDITIONS ================= */
  useEffect(() => {
    if (votingStatus !== "open") {
      alert("Voting is currently closed.");
      navigate("/dashboard");
    }

    const voted = localStorage.getItem(
      `voted_${electionYear}_${matricNumber}`
    );

    if (voted === "true") {
      alert("You have already voted for this election year.");
      navigate("/dashboard");
    }
  }, [navigate, matricNumber, electionYear, votingStatus]);

  /* ================= SUBMIT VOTE ================= */
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

    alert("✅ Your vote has been submitted successfully.");
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9" }}>
      {/* ================= NAVBAR ================= */}
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
                    className="border rounded p-3 mb-3 d-flex align-items-center"
                  >
                    <input
                      className="form-check-input me-3"
                      type="radio"
                      name="candidate"
                      value={candidate.id}
                      onChange={() => setSelectedCandidate(candidate.id)}
                    />

                    {/* ===== CANDIDATE IMAGE ===== */}
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      width="80"
                      height="80"
                      className="me-3"
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #198754",
                      }}
                    />

                    {/* ===== DETAILS ===== */}
                    <div>
                      <strong>{candidate.name}</strong>
                      <br />
                      <small className="text-muted">
                        Position: {candidate.position}
                      </small>
                    </div>
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
