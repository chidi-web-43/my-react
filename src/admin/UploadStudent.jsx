import { useState } from "react";

function UploadStudent() {
  const electionYear =
    localStorage.getItem("electionYear") || new Date().getFullYear().toString();

  const storageKey = `students_${electionYear}`;

  const [matric, setMatric] = useState("");
  const [name, setName] = useState("");
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || []
  );

  const addStudent = () => {
    if (!matric || !name) {
      alert("All fields required");
      return;
    }

    if (!/^\d+$/.test(matric)) {
      alert("Matric number must be numbers only");
      return;
    }

    const exists = students.some((s) => s.matric === matric);
    if (exists) {
      alert("Student already uploaded for this year");
      return;
    }

    const updated = [...students, { matric, name }];
    setStudents(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setMatric("");
    setName("");
    alert("✅ Student uploaded successfully");
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4">
        Upload Students – {electionYear}
      </h3>

      <div className="card p-4 shadow-sm">
        <input
          className="form-control mb-3"
          placeholder="Matric Number"
          value={matric}
          onChange={(e) => setMatric(e.target.value.replace(/\D/g, ""))}
        />

        <input
          className="form-control mb-3"
          placeholder="Student Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={addStudent}>
          Upload Student
        </button>
      </div>
    </div>
  );
}

export default UploadStudent;
