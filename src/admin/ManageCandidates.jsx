import { useState, useEffect } from "react";

function ManageCandidates() {
  const electionYear =
  localStorage.getItem("electionYear") || new Date().getFullYear().toString();


  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(`candidates_${electionYear}`)) || [];
    setCandidates(stored);
  }, [electionYear]);

  const addCandidate = (e) => {
    e.preventDefault();
    if (!name || !position) return;

    const updated = [
      ...candidates,
      { id: Date.now(), name, position }
    ];

    setCandidates(updated);
    localStorage.setItem(
      `candidates_${electionYear}`,
      JSON.stringify(updated)
    );

    setName("");
    setPosition("");
  };

  const deleteCandidate = (id) => {
    const updated = candidates.filter(c => c.id !== id);
    setCandidates(updated);
    localStorage.setItem(
      `candidates_${electionYear}`,
      JSON.stringify(updated)
    );
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold">
        Manage Candidates – {electionYear}
      </h3>

      <form onSubmit={addCandidate} className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-select mb-2"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="">Select Position</option>
          <option>President</option>
          <option>Vice President</option>
          <option>Secretary</option>
          <option>Treasurer</option>
        </select>

        <button className="btn btn-success">Add Candidate</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>{c.position}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCandidate(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {candidates.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No candidates yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCandidates;
