import { useEffect, useState } from "react";

function ManageCandidates() {
  const electionYear =
    localStorage.getItem("electionYear") ||
    new Date().getFullYear().toString();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [candidates, setCandidates] = useState([]);

  const storageKey = `candidates_${electionYear}`;

  // ================= LOAD CANDIDATES =================
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(storageKey)) || [];
    setCandidates(stored);
  }, [storageKey]);

  // ================= IMAGE HANDLER =================
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ================= ADD CANDIDATE =================
  const addCandidate = () => {
    if (!name || !position || !image) {
      alert("All fields including image are required");
      return;
    }

    const newCandidate = {
      id: Date.now().toString(),
      name,
      position,
      image,
    };

    const updated = [...candidates, newCandidate];
    setCandidates(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setName("");
    setPosition("");
    setImage("");

    alert("Candidate added successfully");
  };

  // ================= DELETE =================
  const deleteCandidate = (id) => {
    const updated = candidates.filter((c) => c.id !== id);
    setCandidates(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">
        Manage Candidates – {electionYear}
      </h3>

      {/* ADD FORM */}
      <div className="card p-4 shadow-sm mb-4">
        <input
          className="form-control mb-3"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Position (e.g. President)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleImage}
        />

        <button className="btn btn-primary w-100" onClick={addCandidate}>
          Add Candidate
        </button>
      </div>

      {/* CANDIDATE LIST */}
      <div className="row">
        {candidates.map((c) => (
          <div className="col-md-4 mb-4" key={c.id}>
            <div className="card shadow-sm text-center">
              <img
                src={c.image}
                alt={c.name}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="fw-bold">{c.name}</h5>
                <p className="text-muted">{c.position}</p>

                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => deleteCandidate(c.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageCandidates;
