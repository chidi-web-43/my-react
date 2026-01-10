import { useEffect, useState } from "react";

function ManageCandidates() {
  const electionYear =
    localStorage.getItem("electionYear") ||
    new Date().getFullYear().toString();

  const votingStatus =
    localStorage.getItem(`votingStatus_${electionYear}`) || "closed";

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [candidates, setCandidates] = useState([]);

  const storageKey = `candidates_${electionYear}`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    setCandidates(stored);
  }, [storageKey]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const addCandidate = () => {
    if (!name || !position || !image) {
      alert("All fields required");
      return;
    }

    const updated = [
      ...candidates,
      { id: Date.now().toString(), name, position, image },
    ];

    setCandidates(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setName("");
    setPosition("");
    setImage("");
  };

  return (
    <div className="container py-5">
      <h3 className="fw-bold">
        Manage Candidates – {electionYear}
      </h3>

      {votingStatus === "open" && (
        <div className="alert alert-warning mt-3">
          Candidates are locked because voting has started.
        </div>
      )}

      <div className="card p-4 mt-3">
        <input
          className="form-control mb-3"
          placeholder="Candidate Name"
          value={name}
          disabled={votingStatus === "open"}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Position"
          value={position}
          disabled={votingStatus === "open"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          type="file"
          className="form-control mb-3"
          disabled={votingStatus === "open"}
          onChange={handleImage}
        />

        <button
          className="btn btn-primary w-100"
          disabled={votingStatus === "open"}
          onClick={addCandidate}
        >
          Add Candidate
        </button>
      </div>
    </div>
  );
}

export default ManageCandidates;
