import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Vote() {
  const navigate = useNavigate();

  const matricNumber = localStorage.getItem("matricNumber");
  const studentName = localStorage.getItem("studentName");

  const electionYear =
    localStorage.getItem("electionYear") ||
    new Date().getFullYear().toString();

  const votingStatus =
    localStorage.getItem(`votingStatus_${electionYear}`) || "closed";

  const [candidates, setCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState({});

  /* ================= LOAD CANDIDATES ================= */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(`candidates_${electionYear}`)) || [];

    setCandidates(stored);

    const uniquePositions = [...new Set(stored.map(c => c.position))];
    setPositions(uniquePositions);
  }, [electionYear]);

  /* ================= CHECK ELIGIBLE ================= */
  useEffect(() => {
    const students =
      JSON.parse(localStorage.getItem(`students_${electionYear}`)) || [];

    const eligible = students.some(s => s.matric === matricNumber);

    if (!eligible) {
      alert("❌ You are not eligible to vote.");
      navigate("/dashboard");
    }
  }, [electionYear, matricNumber, navigate]);

  /* ================= CHECK STATUS ================= */
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

  const handleSelect = (position, candidateId) => {
    setSelectedVotes({ ...selectedVotes, [position]: candidateId });
  };

  /* ================= SUBMIT ================= */
  const handleSubmitVotes = () => {
    if (Object.keys(selectedVotes).length !== positions.length) {
      alert("⚠️ Please vote for all positions.");
      return;
    }

    const votesKey = `votes_${electionYear}`;
    const votes = JSON.parse(localStorage.getItem(votesKey)) || {};

    Object.values(selectedVotes).forEach(id => {
      votes[id] = (votes[id] || 0) + 1;
    });

    localStorage.setItem(votesKey, JSON.stringify(votes));
    localStorage.setItem(`voted_${electionYear}_${matricNumber}`, "true");

    /* SAVE RECEIPT */
    const receipt = {
      electionYear,
      matricNumber,
      votes: selectedVotes,
      time: new Date().toLocaleString(),
    };

    localStorage.setItem(
      `receipt_${electionYear}_${matricNumber}`,
      JSON.stringify(receipt)
    );

    navigate("/receipt");
  };

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-3">
        SUG Voting – {electionYear}
      </h4>

      <p className="text-muted">
        {studentName} ({matricNumber})
      </p>

      {positions.map(position => (
        <div key={position} className="mb-4">
          <h5 className="fw-bold text-success">{position}</h5>

          {candidates
            .filter(c => c.position === position)
            .map(candidate => (
              <div
                key={candidate.id}
                className="border rounded p-3 mb-2 d-flex align-items-center"
              >
                <input
                  type="radio"
                  className="form-check-input me-3"
                  name={position}
                  checked={selectedVotes[position] === candidate.id}
                  onChange={() =>
                    handleSelect(position, candidate.id)
                  }
                />

                <img
                  src={candidate.image}
                  alt={candidate.name}
                  width="70"
                  height="70"
                  className="me-3 rounded-circle"
                  style={{ objectFit: "cover" }}
                />

                <strong>{candidate.name}</strong>
              </div>
            ))}
        </div>
      ))}

      <button
        className="btn btn-success w-100"
        onClick={handleSubmitVotes}
      >
        Submit All Votes
      </button>
    </div>
  );
}

export default Vote;
